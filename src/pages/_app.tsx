import React, { useState } from "react";
import type { AppProps } from "next/app";
import AppContext from 'context/AppContext'
import "styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default App;
