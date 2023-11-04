"use client"

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Home() {
  const [fileState, setFileState] = useState<File | string>()

  const changeFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setFileState(e.target.files[0])


  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    
    const formData = new FormData()
    formData.append("fileUpload", fileState as string)

    await axios.post('/api', formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={submitHandler}>
        <input onChange={changeFileHandler} name="fileUpload" type="file" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
