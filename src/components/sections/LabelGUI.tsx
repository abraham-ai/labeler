import Head from 'next/head'
import { useState, useEffect, useRef } from 'react';
import { Button } from 'antd'

const BUFFER_SIZE = 200;

const LabelGUI = ({ collectionName, mediaType }: { collectionName: string, mediaType: string }) => {
  const [imageBuffer, setImageBuffer] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const currentImageRef = useRef<string>("");
  const [name, setName] = useState<string>("");
  const nameRef = useRef<string>("");

  useEffect(() => {
    console.log("the name is", name);
    if (name == "") {
      const promptName = prompt("Please enter your name");
      setName(promptName || "anonymous");
      nameRef.current = promptName || "anonymous";
    }
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  useEffect(() => {
    fillImageBuffer();
  }, [imageBuffer]);

  useEffect(() => {
    if (imageBuffer.length > 0) {
      setCurrentImage(imageBuffer[0]);
      currentImageRef.current = imageBuffer[0];
    }
  }, [imageBuffer]);

  const handleClick = async (rating: number, labeledImage: string) => {
    const imageName = labeledImage.split('/').pop();
    const newRow = { name: nameRef.current, image: imageName, rating }
    await fetch('/api/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    });
    setImageBuffer((prevBuffer) => prevBuffer.slice(1));
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (key >= '1' && key <= '5') {
      handleClick(parseInt(key), currentImageRef.current);
    }
  }

  const fillImageBuffer = async () => {
    if (imageBuffer.length > BUFFER_SIZE) return;
    const res = await fetch('/api/image');
    const data = await res.json();
    const img = new Image();
    img.onload = () => {
      if (imageBuffer.length > BUFFER_SIZE) return;
      setImageBuffer((prevBuffer) => [...prevBuffer, img.src]);
    };
    img.src = data.imagePath;
  };
  
  return (
    <div className="container">
      <Head>
        <title>Labeler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <ul>
            <b>{imageBuffer.length} :: {currentImage}</b>
            {imageBuffer.map((image, index) => (
              <li key={index}>{image}</li>
            ))}
          </ul>
          <br/> */}
          <ul>
            {imageBuffer.map((image, index) => (
              <img key={index} style={{display: "none"}} src={image} />
            ))}
          </ul>
          <br/>
          <img src={currentImage} height={window.innerHeight * 0.9} />          
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button 
              key={num} 
              size="large" style={{ margin: '0 1rem' }} onClick={() => handleClick(num, currentImage)}
            >
              {num}
            </Button>
          ))}
        </div>
        <b>Current buffer length: {imageBuffer.length}</b>
      </main>
    </div>
  )
}

export default LabelGUI;
