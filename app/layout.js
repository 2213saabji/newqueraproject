'use client'
import './globals.css'
import './(styles)/navbar.css'
import './(styles)/login.css'
import { useContext, createContext, useState, useEffect, useRef, useMemo } from 'react'
import { Inter } from 'next/font/google'
import Navbar from "./(navbar)/navbar"
import { Box } from "@mui/material"
import { baseurl, crossicon, globalicon, imagesicon } from './(navbar)/constant'



const MyContext = createContext();

export function allContext() {
  return useContext(MyContext);
}

export default function RootLayout({ children }) {
  const inputpicuploader = useRef();
  const imagestorediv = useRef();
  const imgRef = useRef();
  const [theme, settheme] = useState("light");
  const [logintoken, setlogintoken] = useState(false);
  const [blackscreen2, setblackscreen2] = useState(false);
  const [loader, setloader] = useState(false);
  const [activePostOrQueDiv, setactivePostOrQueDiv] = useState(true)
  const [uppercase, setuppercase] = useState(false);
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');
  const [imgpost, setimgpost] = useState();
  const [question, setquestion] = useState("")
  const [toggle, settoggle] = useState(false);


  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        const imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(file);
        let outerDiv = imagestorediv.current;
        outerDiv.innerHTML = "";
        imgRef.current = imgElement;
        imgElement.classList.add("attachedimage")
        outerDiv.classList.add("attachedimage");
        outerDiv.appendChild(imgElement);
        setimgpost(file);
      }
    }
  };


  const postfun = async () => {
    try {
      if (title != "" && content != "" && imgpost) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('images', imgpost);
        const response = await (await fetch(`${baseurl}/quora/post/`,
          {
            method: "POST",
            headers: {
              projectID: "7zwdmzusuw4h",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: formData
          }
        )).json();
        settitle("");
        setcontent("");
        setimgpost("");
        imagestorediv.current.innerHTML = "";
        setblackscreen2(false);
        settoggle(!toggle)
      }
    } catch (error) {
      alert(error);
    }
  }

  const questionfun = async () => {
    try {
      if (question != "") {
        // const response = await (await fetch(`${baseurl}/quora/post/`,
        //   {
        //     method: "POST",
        //     headers: {
        //       projectID: "7zwdmzusuw4h",
        //       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        //     },
        //     body: JSON.stringify({
        //       title: title,
        //       content: content,
        //       images: "",
        //    })
        //   }
        // )).json();

      }
    } catch (error) {
      alert(error);
    }
  }

  


  function imagepicker() {
    inputpicuploader.current.click();
  }

  function themecheck(val1, val2) {
    return theme === "light" ? val1 : val2
  }

  function closepopups() {
    setblackscreen2(false);
  }

  useEffect(() => {
    if (typeof (localStorage.getItem("token")) == "string") {
      setlogintoken(true);
    }
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    else {
      settheme(localStorage.getItem("theme"));
    }
  }, [])

  return (
    <html lang="en">
      <body>

        <MyContext.Provider value={{
          theme, settheme,
          logintoken, setlogintoken,
          loader, setloader,
          blackscreen2, setblackscreen2,
          toggle,settoggle,
          activePostOrQueDiv,setactivePostOrQueDiv,
          themecheck,
          uppercase,
          inputpicuploader,
          imagestorediv,
          imagepicker,
          handleFileSelection,
          setuppercase,
          title,settitle,
          content,setcontent, 
          imgpost,setimgpost,
        }}>
          <Box className={`wholewebsiteMaindiv ${themecheck("bkllwhite", "bkblack")} posfix`} sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", position: "relative" }}>
            <Box className={`${themecheck("boxshadowlgray", "boxshadowblack")} ${themecheck("bkwhite", "bklightblack")}`} sx={{ zIndex: "1000", width: "100%", display: "flex", justifyContent: "center" }}>
              <Box sx={{ maxWidth: "1250px", width: "100%" }}>
                <Navbar />
              </Box>
            </Box>
            <Box sx={{ maxWidth: "1100px", width: "100%" }} className={`mt20 ${logintoken ? "posfix" : ""}`} >
              {children}
            </Box>
            {blackscreen2 && <div className={`blackscreen2 flexja`} onClick={() => { closepopups() }}>
              <div className={`createPostDiv flex flexc brdr-r12 ${themecheck("bkwhite", "bklightblack")}`} onClick={(e) => { e.stopPropagation() }}>
                <div className={`mt20 flexa`}>
                  <div className={`ml20 csrpntr`} onClick={() => { setblackscreen2(false) }}>{crossicon}</div>
                  <div className={`flexja w100per`}>
                    <p className={`flexa g5 ${themecheck("txt8", "txt7")}`}>{globalicon} Everyone</p>
                  </div>
                </div>
                <div className={`activePostOrQueDiv mt5 brdrb1 flexja ${themecheck("brdrlightgray", "brdrllgray")}`}>
                  <div className={`flexja w100per p10 csrpntr  ${themecheck("txt8", "txt7")} ${activePostOrQueDiv ? "brdrbottom" : ""}`} onClick={() => { setactivePostOrQueDiv(true) }}>Add Question</div>
                  <div className={`flexja w100per p10 csrpntr  ${themecheck("txt8", "txt7")} ${activePostOrQueDiv ? "" : "brdrbottom"}`} onClick={() => { setactivePostOrQueDiv(false) }}>Create Post</div>
                </div>

                {activePostOrQueDiv && <div className={`w100per addquestiondiv fgrow1 flex flexc `}>
                  <div className={`bkblueopacity3 pl30 pt10 pb10 brdrbx mt10 ml20 mr20`}>
                    <h4 className={`txt9`}>Tips on getting good answers quickly</h4>
                    <ul className={`ml30`}>
                      <li className={`txt9 fnt14 `}>Make sure your question has not been asked already</li>
                      <li className={`txt9 fnt14 `}>Keep your question short and to the point</li>
                      <li className={`txt9 fnt14 `}>Double-check grammar and spelling</li>
                    </ul>
                  </div>
                  <div className={`fgrow1 flexja w100per pt10`}>
                    {/* <textarea rows={4} value={question} onChange={(e) => { setquestion(e.target.value) }} className={`w100per pl10 pr10 pt10 h100per  ${themecheck("bkllwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} placeholder='Say something...' /> */}
                    <div className={``}><div className={`featurecomingsoonmessage`}></div><p className={`${themecheck("txt5","txt1")}`}>This feature will come soon</p></div>
                  </div>
                  <div className={`addquestiondowndiv w100per brdrt1 flexj flexc ${themecheck("brdrlightgray", "brdrllgray")}`}>

                    <button className={` pt10 pb10 pl30 pr30 brdr-r50 nodrop mr20 w500 fnt15 txt7 bkblue ${/*!question ? "bkblue" : "bkpureblue"*/ ""}`} onClick={() => {}} disabled={true} /*disabled={!question}*/>Add question</button>
          
                  </div>
                </div>}

                {!activePostOrQueDiv && <div className={`w100per createpostdiv flex flexc fgrow1 brdr-r12`}>
                  <div className={`flexa mt10 mb10`}>
                    <h2 className={`userlogo ml10 w500 flexja ${themecheck("bkgray", "bklightgray")} ${themecheck("txt7", "txt8")}`}>{JSON.parse(localStorage.getItem("userdetails")).name.charAt(0)}</h2>
                    <h3 className={`w500 pl10 pr20 ${themecheck("brdrwdth1", "brdrwdth1")} ${themecheck("txt8", "txt7")}`}>{JSON.parse(localStorage.getItem("userdetails")).email}</h3>
                  </div>
                  <div className={`fgrow1 createPostTextareaOuterDiv`}>
                    <input value={title} onChange={(e) => { settitle(e.target.value) }} className={`w100per pl10 pb20 pr10 pt10 brdrb1 ${themecheck("brdrlightgray", "brdrllgray")} ${uppercase ? "uppercase" : ""} ${themecheck("bkwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} placeholder='Title...' />
                    <textarea rows={4} value={content} onChange={(e) => { setcontent(e.target.value) }} className={`w100per pl10 pr10 pt10 h100per ${uppercase ? "uppercase" : ""} ${themecheck("bkwhite", "bklightblack")} ${themecheck("txt8", "txt7")}`} placeholder='Say something...' />
                  </div>
                  <div className={`flexa flexjsb createpostdowndiv pr10 pl10 brdrt1 ${themecheck("brdrlightgray", "brdrllgray")}`}>
                    <div className={`flexa`}><div className={`fnt20 w600 mr10 csrpntr ${themecheck("txt5", "txt1")}`} onClick={() => { setuppercase(!uppercase) }}>Aa</div>
                      <div className={`csrpntr flex`} onClick={() => { imagepicker() }} >{imagesicon}<input type='file' ref={inputpicuploader} style={{ display: "none" }} onChange={(e) => { handleFileSelection(e) }} /><div ref={imagestorediv}></div></div></div>
                    <button className={` pt10 pb10 pl30 pr30 brdr-r50 w500 fnt15 txt7  ${!title || !content || !imgpost ? "bkblue" : "bkpureblue csrpntr"}`} onClick={() => { postfun() }} disabled={!title || !content || !imgpost}>Post</button>
                  </div>
                </div>}
              </div>
            </div>}
          </Box>
        </MyContext.Provider>
      </body>
    </html>
  )
}
