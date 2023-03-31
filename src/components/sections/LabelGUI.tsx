import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Button } from 'antd'

const LabelGUI = ({ collectionName, mediaType }: { collectionName: string, mediaType: string }) => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchImage();
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const handleClick = async (rating: number, image: string) => {
    const newRow = { name: 'user', image: image, rating }
    const res = await fetch('/api/label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    });
    fetchImage();
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (key >= '1' && key <= '5') {
      handleClick(parseInt(key), image);
    }
  }

  const fetchImage = async () => {
    const res = await fetch('/api/image');
    const data = await res.json();
    setImage(data.imagePath);
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Labeler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? (
            <p>Loading image...</p>
          ) : (
            <>
            url: {image}
            <br/>
            <img src={image} />
            </>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button 
              key={num} 
              size="large" style={{ margin: '0 1rem' }} onClick={() => handleClick(num, image)}
            >
              {num}
            </Button>
          ))}
        </div>
      </main>

    </div>
  )
}

export default LabelGUI;
