import React, {useState, useEffect} from "react"


const MemeGenerator = () => {

    const [inputText, setInputText] = useState({
        topText : "",
        bottomText: "",
    })
    const [randomImage, setRandomImage] = useState("https://i.imgflip.com/26am.jpg")

    const [allMemeImgs, setAllMemeImgs] = useState([])

    const handleChange = e => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const randNum = Math.floor(Math.random() * allMemeImgs.length)
        const randMemeImgUrl = allMemeImgs[randNum].url
        setRandomImage(randMemeImgUrl)
    }

    useEffect( () => {
        console.log("test run")
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => setAllMemeImgs(response.data.memes))
    }, []
    )

    return (

        <div className="meme-container">
            <form onSubmit = {handleSubmit}>
                <input
                type = "text"
                name = "topText"
                placeholder = "Add Top Text"
                value = {inputText.topText}
                onChange = {handleChange}
                />
                <input
                type="text"
                name = "bottomText"
                placeholder = "Add Bottom Text"
                value = {inputText.bottomText}
                onChange = {handleChange}
                />
                <button>Generator</button>
            </form>
            <div className="meme">
                <img src = {randomImage} alt="" />
                <h2 className="top">{inputText.topText}</h2>
                <h2 className="bottom">{inputText.bottomText}</h2>
            </div>
        </div>

    )
}

export default MemeGenerator