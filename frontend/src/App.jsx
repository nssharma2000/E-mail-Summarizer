import { useState } from 'react'
import './App.css'

function App() {

  const [file, setFile] = useState(null)

  const [transcript, setTranscript] = useState("")

  const [summary, setSummary] = useState("")

  const [prompt, setPrompt] = useState("")

  const [recipients, setRecipients] = useState("")

  const backendUrl = import .meta.env.BACKEND_URL

  



  return (
    <>
      <div id="main_container" style={{ width: "100%", height: "100vh", margin: "auto" }}>
        <div id="bg" style={{ width: "100%", margin: "auto" }}>
          <h1 style={{ margin: "auto", fontSize: "2em" }}>
            Meeting Notes Summarizer
          </h1>
          <br />
          <input type="file" accept=".txt, .doc, .docx" onChange={ async (e) => {
            const file = e.target.files[0]
            if (!file)
            {
              return
            }

            setFile(file)
            const text = await file.text()
            setTranscript(text)
          }}>
          </input>
          <textarea value={ transcript } onChange={(e) => setTranscript(e.target.value)} placeholder="Transcript..." style={{ width: "90%", height: "30vh", marginTop: "20px", border: "2px solid black", font: "1rem Calibri" }}></textarea>
          <textarea value={ prompt } onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt here..." style={{ width: "90%", height: "30vh", marginTop: "20px", border: "2px solid black", font: "1rem Calibri" }}></textarea>
          <button onClick={async () => {
            if(!transcript)
            {
              alert("Please enter transcript or upload a transcript file first.")
              return
            }
            if(!prompt)
            {
              alert("Please enter a prompt.")
              return
            }

            const response = await fetch(backendUrl + "/summarize", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ transcript, prompt })
              })

            const dataJSON = await response.json()
            setSummary(dataJSON.summary)
            }
          }
          style={{ backgroundColor: "#DDDDDD" }}>
            Summarize
          </button>
          <textarea value={ summary } placeholder="Summary will appear here..." style={{ width: "90%", height: "30vh", marginTop: "20px", border: "2px solid black", font: "1rem Calibri" }}></textarea>
          <br />
          <textarea value={ recipients } placeholder="Enter recipients' e-mails (comma-separated)" style={{ width: "90%", height: "30vh", marginTop: "20px", border: "2px solid black", font: "1rem Calibri" }} onChange={ (e) => setRecipients(e.target.value) }></textarea>
          <br />
          <button style={{ backgroundColor: "#DDDDDD" }} onClick={ async () => {
            if(!summary)
            {
              alert("Please generate a summary first.")
              return
            }
            if(!recipients)
            {
              alert("Please enter recipients' e-mails.")
              return
            }

            const response = await fetch(backendUrl + "/send_email", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ summary, recipients: recipients.split(",").map(email => email.trim()) })
            })
          }}
          >Send mail</button>
        </div>
      </div>
    </>
  )
}

export default App
