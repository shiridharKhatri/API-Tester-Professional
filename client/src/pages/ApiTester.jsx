"use client"

import { useState } from "react"
import {
  Send,
  Plus,
  X,
  Copy,
  Globe,
  Key,
  Search,
  FileCode,
  Upload,
  Code,
  ImageIcon,
  LinkIcon,
  Play,
  CheckCircle,
  AlertTriangle,
  Loader,
  ExternalLink,
  Settings,
  BarChart3,
  Expand,
  TimerIcon as Times,
  MagnetIcon as Magic,
} from "lucide-react"
import "../styles/api-tester.css"

const ApiTester = () => {
  const [apiUrl, setApiUrl] = useState("")
  const [httpMethod, setHttpMethod] = useState("GET")
  const [headers, setHeaders] = useState([{ key: "", value: "" }])
  const [params, setParams] = useState([{ key: "", value: "" }])
  const [requestBody, setRequestBody] = useState("")
  const [formData, setFormData] = useState([{ type: "text", key: "", value: "", file: null }])
  const [rawJsonInput, setRawJsonInput] = useState("")
  const [mediaKeys, setMediaKeys] = useState([
    "src",
    "url",
    "href",
    "image",
    "images",
    "thumbnail",
    "photo",
    "picture",
    "avatar",
    "icon",
    "video",
    "videos",
    "movie",
    "clip",
    "media",
  ])
  const [linkKeys, setLinkKeys] = useState(["url", "link", "href", "website", "homepage", "site", "web", "domain"])
  const [newMediaKey, setNewMediaKey] = useState("")
  const [newLinkKey, setNewLinkKey] = useState("")
  const [activeTab, setActiveTab] = useState("formatted")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mediaGroups, setMediaGroups] = useState([])
  const [links, setLinks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const updateRequestBodyVisibility = () => {
    return !["GET", "DELETE", "OPTIONS"].includes(httpMethod)
  }

  const addKeyValuePair = (type) => {
    if (type === "header") {
      setHeaders([...headers, { key: "", value: "" }])
    } else if (type === "param") {
      setParams([...params, { key: "", value: "" }])
    } else if (type === "formData") {
      setFormData([...formData, { type: "text", key: "", value: "", file: null }])
    }
  }

  const removeKeyValuePair = (type, index) => {
    if (type === "header" && headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index))
    } else if (type === "param" && params.length > 1) {
      setParams(params.filter((_, i) => i !== index))
    } else if (type === "formData" && formData.length > 1) {
      setFormData(formData.filter((_, i) => i !== index))
    }
  }

  const updateKeyValuePair = (type, index, field, value) => {
    if (type === "header") {
      const newHeaders = [...headers]
      newHeaders[index][field] = value
      setHeaders(newHeaders)
    } else if (type === "param") {
      const newParams = [...params]
      newParams[index][field] = value
      setParams(newParams)
    } else if (type === "formData") {
      const newFormData = [...formData]
      newFormData[index][field] = value
      setFormData(newFormData)
    }
  }

  const addDetectionKey = (type) => {
    if (type === "media" && newMediaKey.trim() && !mediaKeys.includes(newMediaKey.trim())) {
      setMediaKeys([...mediaKeys, newMediaKey.trim()])
      setNewMediaKey("")
    } else if (type === "link" && newLinkKey.trim() && !linkKeys.includes(newLinkKey.trim())) {
      setLinkKeys([...linkKeys, newLinkKey.trim()])
      setNewLinkKey("")
    }
  }

  const removeDetectionKey = (type, key) => {
    if (type === "media") {
      setMediaKeys(mediaKeys.filter((k) => k !== key))
    } else if (type === "link") {
      setLinkKeys(linkKeys.filter((k) => k !== key))
    }
  }

  const parseRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonInput)
      setRequestBody(JSON.stringify(parsed, null, 2))
      setRawJsonInput("")
      setError(null)
    } catch (error) {
      setError(`Invalid JSON: ${error.message}`)
    }
  }

  const buildURL = (baseUrl, params) => {
    const url = new URL(baseUrl)
    params.forEach((param) => {
      if (param.key && param.value) {
        url.searchParams.append(param.key, param.value)
      }
    })
    return url.toString()
  }

  const collectHeaders = () => {
    const headerObj = {}
    headers.forEach((header) => {
      if (header.key && header.value) {
        headerObj[header.key] = header.value
      }
    })
    return headerObj
  }

  const collectFormData = () => {
    const formDataObj = new FormData()
    let hasFormData = false

    formData.forEach((field) => {
      if (field.key) {
        if (field.type === "file" && field.file) {
          formDataObj.append(field.key, field.file)
          hasFormData = true
        } else if (field.type === "text" && field.value) {
          formDataObj.append(field.key, field.value)
          hasFormData = true
        }
      }
    })

    return hasFormData ? formDataObj : null
  }

  const sendRequest = async () => {
    if (!apiUrl) return

    setLoading(true)
    setError(null)

    try {
      const finalUrl = buildURL(apiUrl, params)
      const requestHeaders = collectHeaders()
      const formDataObj = collectFormData()

      const requestOptions = {
        method: httpMethod,
        headers: requestHeaders,
      }

      if (formDataObj && ["POST", "PUT", "PATCH"].includes(httpMethod)) {
        requestOptions.body = formDataObj
      } else if (["POST", "PUT", "PATCH"].includes(httpMethod) && requestBody) {
        if (!requestHeaders["Content-Type"]) {
          requestOptions.headers["Content-Type"] = "application/json"
        }
        requestOptions.body = requestBody
      }

      const startTime = performance.now()
      const response = await fetch(finalUrl, requestOptions)
      const endTime = performance.now()
      const responseTime = Math.round(endTime - startTime)

      const responseText = await response.text()
      let responseData

      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        responseData = responseText
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: responseData,
        rawText: responseText,
        responseTime,
        ok: response.ok,
      })

      extractMediaAndLinks(responseData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const extractMediaAndLinks = (data) => {
    const groups = findMediaGroups(data)
    const detectedLinks = findContent(data, linkKeys, isLinkUrl)

    setMediaGroups(groups)
    setLinks(detectedLinks)
  }

  const findMediaGroups = (obj, path = "", groups = []) => {
    if (Array.isArray(obj)) {
      const arrayImages = []
      const arrayVideos = []

      obj.forEach((item, index) => {
        if (typeof item === "string" && isMediaUrl(item, "array_item")) {
          const mediaData = { url: item, source: `${path}[${index}]` }
          if (isVideoUrl(item)) {
            arrayVideos.push(mediaData)
          } else {
            arrayImages.push(mediaData)
          }
        } else if (item && typeof item === "object") {
          const objectImages = []
          const objectVideos = []

          Object.keys(item).forEach((key) => {
            const value = item[key]
            if (typeof value === "string" && isMediaUrl(value, key)) {
              const mediaData = { url: value, source: `${path}[${index}].${key}` }
              if (isVideoUrl(value)) {
                objectVideos.push(mediaData)
              } else {
                objectImages.push(mediaData)
              }
            }
          })

          arrayImages.push(...objectImages)
          arrayVideos.push(...objectVideos)
          findMediaGroups(item, `${path}[${index}]`, groups)
        }
      })

      if (arrayImages.length > 0 || arrayVideos.length > 0) {
        groups.push({
          groupName: path || "root",
          groupPath: path,
          images: arrayImages,
          videos: arrayVideos,
        })
      }
    } else if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key
        const value = obj[key]

        if (Array.isArray(value)) {
          findMediaGroups(value, currentPath, groups)
        } else if (typeof value === "string" && isMediaUrl(value, key)) {
          const mediaData = { url: value, source: currentPath }
          if (isVideoUrl(value)) {
            groups.push({
              groupName: currentPath,
              groupPath: currentPath,
              images: [],
              videos: [mediaData],
            })
          } else {
            groups.push({
              groupName: currentPath,
              groupPath: currentPath,
              images: [mediaData],
              videos: [],
            })
          }
        } else if (typeof value === "object") {
          findMediaGroups(value, currentPath, groups)
        }
      })
    }

    return groups
  }

  const findContent = (obj, keys, validator, path = "", content = []) => {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        findContent(item, keys, validator, `${path}[${index}]`, content)
      })
    } else if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key
        const value = obj[key]

        if (typeof value === "string" && validator(value, key)) {
          content.push({ url: value, source: currentPath })
        } else if (typeof value === "object") {
          findContent(value, keys, validator, currentPath, content)
        }
      })
    }

    return content
  }

  const isMediaUrl = (url, key) => {
    if (!url || typeof url !== "string") return false

    const hasMediaKey = mediaKeys.some((mediaKey) => key.toLowerCase().includes(mediaKey.toLowerCase()))
    const mediaExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|avi|mov|wmv|flv|webm|mkv|m4v|3gp|ogv)(\?.*)?$/i
    const hasMediaExtension = mediaExtensions.test(url)
    const isValidUrl = /^https?:\/\/.+/i.test(url)

    return isValidUrl && (hasMediaKey || hasMediaExtension)
  }

  const isVideoUrl = (url) => {
    if (!url || typeof url !== "string") return false

    const videoExtensions = /\.(mp4|avi|mov|wmv|flv|webm|mkv|m4v|3gp|ogv)(\?.*)?$/i
    const hasVideoExtension = videoExtensions.test(url)
    const videoKeywords = /video|movie|clip|stream|watch/i
    const hasVideoKeyword = videoKeywords.test(url)

    return hasVideoExtension || hasVideoKeyword
  }

  const isLinkUrl = (url, key) => {
    if (!url || typeof url !== "string") return false

    const hasLinkKey = linkKeys.some((linkKey) => key.toLowerCase().includes(linkKey.toLowerCase()))
    const isValidUrl = /^https?:\/\/.+/i.test(url)
    const mediaExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|avi|mov|wmv|flv|webm|mkv|m4v|3gp|ogv)(\?.*)?$/i
    const isMediaUrl = mediaExtensions.test(url)

    return isValidUrl && hasLinkKey && !isMediaUrl
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Show success notification
    })
  }

  const syntaxHighlight = (obj) => {
    if (typeof obj !== "object") {
      return String(obj)
    }

    const json = JSON.stringify(obj, null, 2)
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "json-number"
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "json-key"
          } else {
            cls = "json-string"
          }
        } else if (/true|false/.test(match)) {
          cls = "json-boolean"
        } else if (/null/.test(match)) {
          cls = "json-null"
        }
        return '<span class="' + cls + '">' + match + "</span>"
      },
    )
  }

  const openGalleryModal = (groupData) => {
    setModalContent(groupData)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const getStatusClass = (status) => {
    if (status >= 100 && status < 200) return "status-1xx"
    if (status >= 200 && status < 300) return "status-2xx"
    if (status >= 300 && status < 400) return "status-3xx"
    if (status >= 400 && status < 500) return "status-4xx"
    if (status >= 500) return "status-5xx"
    return "status-1xx"
  }

  return (
    <div className="api-tester">
      <div className="container">
        <div className="main-grid">
          {/* Configuration Panel */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <Settings size={16} />
                Request Configuration
              </div>
            </div>
            <div className="panel-content">
              {/* Endpoint Section */}
              <div className="form-section">
                <div className="section-header">
                  <Globe size={14} />
                  <h3>Endpoint</h3>
                </div>

                <div className="form-group">
                  <label className="form-label">API URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://api.example.com/endpoint"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">HTTP Method</label>
                  <select
                    className={`form-select method-${httpMethod.toLowerCase()}`}
                    value={httpMethod}
                    onChange={(e) => setHttpMethod(e.target.value)}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATCH">PATCH</option>
                    <option value="OPTIONS">OPTIONS</option>
                  </select>
                </div>
              </div>

              {/* Headers Section */}
              <div className="form-section">
                <div className="section-header">
                  <Key size={14} />
                  <h3>Headers</h3>
                </div>
                <div className="key-value-container">
                  {headers.map((header, index) => (
                    <div key={index} className="key-value-row">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Header name"
                        value={header.key}
                        onChange={(e) => updateKeyValuePair("header", index, "key", e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Header value"
                        value={header.value}
                        onChange={(e) => updateKeyValuePair("header", index, "value", e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeKeyValuePair("header", index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-success" onClick={() => addKeyValuePair("header")}>
                  <Plus size={14} />
                  Add Header
                </button>
              </div>

              {/* Parameters Section */}
              <div className="form-section">
                <div className="section-header">
                  <Search size={14} />
                  <h3>Query Parameters</h3>
                </div>
                <div className="key-value-container">
                  {params.map((param, index) => (
                    <div key={index} className="key-value-row">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Parameter name"
                        value={param.key}
                        onChange={(e) => updateKeyValuePair("param", index, "key", e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Parameter value"
                        value={param.value}
                        onChange={(e) => updateKeyValuePair("param", index, "value", e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeKeyValuePair("param", index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn btn-success" onClick={() => addKeyValuePair("param")}>
                  <Plus size={14} />
                  Add Parameter
                </button>
              </div>

              {/* Request Body Section */}
              {updateRequestBodyVisibility() && (
                <div className="form-section">
                  <div className="section-header">
                    <FileCode size={14} />
                    <h3>Request Body</h3>
                  </div>
                  <div className="form-group">
                    <label className="form-label">JSON Payload</label>
                    <textarea
                      className="form-textarea"
                      placeholder='{"key": "value"}'
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Form Data Section */}
              {updateRequestBodyVisibility() && (
                <div className="form-section">
                  <div className="section-header">
                    <Upload size={14} />
                    <h3>Form Data</h3>
                  </div>
                  <div className="key-value-container">
                    {formData.map((field, index) => (
                      <div key={index} className="form-data-row">
                        <select
                          className="form-select"
                          value={field.type}
                          onChange={(e) => updateKeyValuePair("formData", index, "type", e.target.value)}
                        >
                          <option value="text">Text</option>
                          <option value="file">File</option>
                        </select>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Field name"
                          value={field.key}
                          onChange={(e) => updateKeyValuePair("formData", index, "key", e.target.value)}
                        />
                        {field.type === "text" ? (
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Field value"
                            value={field.value}
                            onChange={(e) => updateKeyValuePair("formData", index, "value", e.target.value)}
                          />
                        ) : (
                          <input
                            type="file"
                            className="form-input"
                            onChange={(e) => updateKeyValuePair("formData", index, "file", e.target.files[0])}
                          />
                        )}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeKeyValuePair("formData", index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-success" onClick={() => addKeyValuePair("formData")}>
                    <Plus size={14} />
                    Add Form Data Field
                  </button>
                </div>
              )}

              {/* Raw JSON Section */}
              {updateRequestBodyVisibility() && (
                <div className="form-section">
                  <div className="section-header">
                    <Code size={14} />
                    <h3>Raw JSON Input</h3>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Paste Raw JSON</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Paste your raw JSON here..."
                      value={rawJsonInput}
                      onChange={(e) => setRawJsonInput(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={parseRawJson}>
                    <Magic size={14} />
                    Parse & Fill Form
                  </button>
                </div>
              )}

              {/* Media Detection Section */}
              <div className="form-section">
                <div className="section-header">
                  <ImageIcon size={14} />
                  <h3>Media Detection (Images & Videos)</h3>
                </div>
                <div className="detection-section">
                  <div className="detection-header">
                    <span>Media Key Names</span>
                  </div>
                  <div className="detection-list">
                    {mediaKeys.map((key, index) => (
                      <div key={index} className="detection-tag media-tag">
                        {key}
                        <button type="button" className="remove-tag" onClick={() => removeDetectionKey("media", key)}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="add-tag-form">
                    <input
                      type="text"
                      className="add-tag-input"
                      placeholder="Add media key (e.g., video_url)"
                      value={newMediaKey}
                      onChange={(e) => setNewMediaKey(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addDetectionKey("media")}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-small"
                      onClick={() => addDetectionKey("media")}
                    >
                      <Plus size={12} />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Link Detection Section */}
              <div className="form-section">
                <div className="section-header">
                  <LinkIcon size={14} />
                  <h3>Link Detection</h3>
                </div>
                <div className="detection-section">
                  <div className="detection-header">
                    <span>Link Key Names</span>
                  </div>
                  <div className="detection-list">
                    {linkKeys.map((key, index) => (
                      <div key={index} className="detection-tag link-tag">
                        {key}
                        <button type="button" className="remove-tag" onClick={() => removeDetectionKey("link", key)}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="add-tag-form">
                    <input
                      type="text"
                      className="add-tag-input"
                      placeholder="Add link key (e.g., website_url)"
                      value={newLinkKey}
                      onChange={(e) => setNewLinkKey(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addDetectionKey("link")}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary btn-small"
                      onClick={() => addDetectionKey("link")}
                    >
                      <Plus size={12} />
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={`btn btn-primary btn-send method-${httpMethod.toLowerCase()}`}
                onClick={sendRequest}
                disabled={loading || !apiUrl}
              >
                {loading ? (
                  <>
                    <Loader className="spinner" size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">
                <BarChart3 size={16} />
                Response
              </div>
            </div>
            <div className="panel-content">
              <div className="tabs">
                <div
                  className={`tab ${activeTab === "formatted" ? "active" : ""}`}
                  onClick={() => setActiveTab("formatted")}
                >
                  <Code size={14} />
                  Formatted
                </div>
                <div className={`tab ${activeTab === "raw" ? "active" : ""}`} onClick={() => setActiveTab("raw")}>
                  <FileCode size={14} />
                  Raw
                </div>
                <div className={`tab ${activeTab === "media" ? "active" : ""}`} onClick={() => setActiveTab("media")}>
                  <ImageIcon size={14} />
                  Media
                </div>
                <div className={`tab ${activeTab === "links" ? "active" : ""}`} onClick={() => setActiveTab("links")}>
                  <LinkIcon size={14} />
                  Links
                </div>
              </div>

              {/* Status Bar */}
              {(response || error) && (
                <div className="status-bar">
                  <div className={`status-card ${response?.ok ? "status-success" : "status-error"}`}>
                    {response?.ok ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    <div>
                      {response ? (
                        <>
                          <span className={`status-badge ${getStatusClass(response.status)}`}>{response.status}</span>
                          <strong>{response.statusText}</strong> | <strong>Time:</strong> {response.responseTime}ms
                        </>
                      ) : (
                        <span className="status-badge status-error">Error</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content */}
              <div className="tab-content-container">
                {activeTab === "formatted" && (
                  <div className="tab-content active">
                    <div className="code-block">
                      {loading ? (
                        <div className="loading">
                          <Loader className="spinner" size={16} />
                          Processing request...
                        </div>
                      ) : response ? (
                        <>
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                            title="Copy to clipboard"
                          >
                            <Copy size={14} />
                          </button>
                          <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(response.data) }} />
                        </>
                      ) : (
                        <div className="empty-state">
                          <Code size={40} />
                          <h3>Ready to Test</h3>
                          <p>Configure your API request and click Send to see the formatted response</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "raw" && (
                  <div className="tab-content active">
                    <div className="code-block">
                      {loading ? (
                        <div className="loading">
                          <Loader className="spinner" size={16} />
                          Processing request...
                        </div>
                      ) : response ? (
                        <>
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(response.rawText)}
                            title="Copy to clipboard"
                          >
                            <Copy size={14} />
                          </button>
                          <pre>{response.rawText}</pre>
                        </>
                      ) : (
                        <div className="empty-state">
                          <FileCode size={40} />
                          <h3>Raw Response</h3>
                          <p>The raw API response will be displayed here</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "media" && (
                  <div className="tab-content active">
                    {loading ? (
                      <div className="loading">
                        <Loader className="spinner" size={16} />
                        Processing request...
                      </div>
                    ) : mediaGroups.length > 0 ? (
                      <div className="content-grid">
                        {mediaGroups.map((group, index) => (
                          <div key={index} className="content-card" onClick={() => openGalleryModal(group)}>
                            {group.images.length > 0 ? (
                              <div className="image-container">
                                <img
                                  src={group.images[0].url || "/placeholder.svg"}
                                  alt={`Group ${index + 1}`}
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = "none"
                                    e.target.nextElementSibling.style.display = "block"
                                  }}
                                />
                                <div className="image-error" style={{ display: "none" }}>
                                  <AlertTriangle size={24} />
                                  <small>Failed to load</small>
                                </div>
                                <div className="image-overlay">
                                  <div>
                                    <Expand size={32} />
                                    <span>View Gallery</span>
                                  </div>
                                </div>
                                <div className="image-count-badge">
                                  {group.images.length} image{group.images.length !== 1 ? "s" : ""}
                                </div>
                              </div>
                            ) : (
                              <div className="video-preview">
                                <Play size={48} />
                                <span>
                                  {group.videos.length} Video{group.videos.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                            <div className="content-info">
                              <div className="content-source">{group.groupName}</div>
                              <div className="content-stats">
                                {group.images.length} images • {group.videos.length} videos
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <ImageIcon size={40} />
                        <h3>Media Gallery</h3>
                        <p>Images and videos detected in the API response will be displayed here</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "links" && (
                  <div className="tab-content active">
                    {loading ? (
                      <div className="loading">
                        <Loader className="spinner" size={16} />
                        Processing request...
                      </div>
                    ) : links.length > 0 ? (
                      <div className="content-grid">
                        {links.map((link, index) => (
                          <div key={index} className="content-card">
                            <div className="link-preview">
                              <ExternalLink size={32} />
                              <div>External Link</div>
                            </div>
                            <div className="content-info">
                              <div className="content-source">{link.source}</div>
                              <div className="content-url">
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                  {link.url}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <LinkIcon size={40} />
                        <h3>Links Collection</h3>
                        <p>Links detected in the API response will be displayed here</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isModalOpen && modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <ImageIcon size={20} />
                Media Gallery - {modalContent.groupName}
              </div>
              <button className="modal-close" onClick={closeModal}>
                <Times size={20} />
              </button>
            </div>
            <div className="modal-body">
              {modalContent.images.length > 0 && (
                <div className="gallery-section">
                  <h3>
                    <ImageIcon size={16} />
                    Images ({modalContent.images.length})
                  </h3>
                  <div className="gallery-grid">
                    {modalContent.images.map((image, index) => (
                      <div key={index} className="gallery-item">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none"
                            e.target.nextElementSibling.style.display = "block"
                          }}
                        />
                        <div className="image-error" style={{ display: "none" }}>
                          <AlertTriangle size={24} />
                          <small>Failed to load</small>
                        </div>
                        <div className="gallery-item-info">
                          <div className="gallery-item-source">{image.source}</div>
                          <div className="gallery-item-url">
                            <a href={image.url} target="_blank" rel="noopener noreferrer">
                              {image.url}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalContent.videos.length > 0 && (
                <div className="gallery-section">
                  <h3>
                    <Play size={16} />
                    Videos ({modalContent.videos.length})
                  </h3>
                  <div className="video-links">
                    {modalContent.videos.map((video, index) => (
                      <div key={index} className="video-link-item">
                        <div className="video-icon">
                          <Play size={24} />
                        </div>
                        <div className="video-info">
                          <div className="video-source">{video.source}</div>
                          <div className="video-url">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              {video.url}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiTester
