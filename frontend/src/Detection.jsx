

import { useState } from 'react'
import './Detection.css'

function Detection() {
  const [crop, setCrop] = useState('Wheat')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleImage = (event) => {
    const file = event.target.files[0]

    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError('')
    }
  }

  const handleAnalyze = async () => {
    if (!image) return

    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('image', image)
    formData.append('crop', crop)

    try {
      const response = await fetch(
        'http://localhost:5000/api/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message || 'Could not connect to backend')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setImage(null)
    setPreview('')
    setResult(null)
    setError('')
  }

  return (
    <div className="detection-page">
      <div className="detection-heading">
        <span className="section-label">
          AI INTELLIGENCE / DISEASE SCANNER
        </span>
        <h1>Crop Disease <span>Detection</span></h1>
        <p>
          Upload a leaf image and let our AI technology analyze its health.
        </p>
      </div>

      <div className="detection-layout">
        <div className="upload-panel">
          <h2>01. Select Your Crop</h2>
          <p>Choose the crop you want to analyze.</p>

          <div className="crop-options">
            {['Wheat', 'Maize', 'Rice', 'Cotton'].map((item) => (
              <button
                key={item}
                className={
                  crop === item ? 'crop-option active' : 'crop-option'
                }
                onClick={() => {
                  setCrop(item)
                  setResult(null)
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <h2 className="upload-title">02. Upload Leaf Image</h2>
          <p>Choose a clear image of the affected leaf.</p>

          <label className="drop-zone">
            {preview ? (
              <img src={preview} alt="Selected crop leaf" />
            ) : (
              <>
                <span className="upload-icon">↑</span>
                <strong>Drop your leaf image here</strong>
                <span>or click to browse files</span>
                <small>PNG, JPG, JPEG or WEBP</small>
              </>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImage}
              hidden
            />
          </label>

          {image && (
            <div className="selected-file">
              <span>✓ {image.name}</span>
              <button onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}

          <button
            className="analyze-button"
            disabled={!image || loading}
            onClick={handleAnalyze}
          >
            {loading
              ? 'Uploading Image...'
              : '✳ Upload & Analyze →'}
          </button>

          {error && (
            <p style={{ color: '#ff7777', marginTop: '12px' }}>
              {error}
            </p>
          )}

          {result && (
            <div style={{ marginTop: '18px', color: '#a6f477' }}>
              <strong>✓ Image uploaded successfully!</strong>
              <p>File: {result.originalName}</p>
              <p>Selected crop: {crop}</p>
              <p>Saved as: {result.filename}</p>
            </div>
          )}

          <small className="privacy-note">
            Images are uploaded to the AGROVISION AI backend.
          </small>
        </div>

        <div className="analysis-panel">
          <span className="section-label">AI ANALYSIS CENTER</span>

          <div className="analysis-visual">
            {preview ? (
              <img src={preview} alt="Crop preview" />
            ) : (
              <span>✳</span>
            )}
          </div>

          <h3>
            {result
              ? 'Image Received Successfully'
              : image
                ? 'Image Ready for Upload'
                : 'Awaiting Input'}
          </h3>

          <p>
            {result
              ? 'Your image has reached the backend successfully. AI prediction integration is the next stage.'
              : image
                ? `${crop} image selected. Ready to upload.`
                : 'Your crop health analysis will appear here after image selection.'}
          </p>

          <div className="system-status">
            <span>●</span> SYSTEM ONLINE
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detection

