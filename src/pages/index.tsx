import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { enableTabToIndent } from "indent-textarea";
import { ShareData } from "@/utils/interface";

const Home: NextPage<ShareData> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      enableTabToIndent(textarea);
    }
  }, []);

  const shareHandler = async () => {
    try {
      const result = await (
        await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api`,
          { title, text }
        )
      ).data;
      if (result) {
        toast.success("Successfully Shared Text!");
        return;
      }
      throw new Error();
    } catch (error) {
      toast.error("Error!");
    }
  };

  const copyToClipboardHandler = async () => {
    try {
      toast.success("Copy to Clipboard!");
    } catch (error) {
      toast.error("Error!");
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-cyan-600 h-screen items-center py-10">
        <ToastContainer autoClose={2000} theme={"colored"} />
        <h1 className="text-gray-200 text-5xl font-black italic">TextShare</h1>
        <div className="flex flex-col px-5 h-3/4 w-full md:w-3/4 md:h-full">
          <h1 className="text-gray-200 text-xl font-black mt-5">Title</h1>
          <div>
            <CopyToClipboard text={title} onCopy={copyToClipboardHandler}>
              <button className="bg-gray-200 my-2 px-3 py-1 rounded text-cyan-600 font-bold hover:bg-cyan-700 hover:text-gray-200 transition-all text-sm">
                Copy
              </button>
            </CopyToClipboard>
          </div>
          <input
            className="bg-gray-200 rounded resize-none outline-none p-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h1 className="text-gray-200 text-xl font-black mt-5">Text</h1>
          <div>
            <CopyToClipboard text={text} onCopy={copyToClipboardHandler}>
              <button className="bg-gray-200 my-2 px-3 py-1 rounded text-cyan-600 font-bold hover:bg-cyan-700 hover:text-gray-200 transition-all text-sm">
                Copy
              </button>
            </CopyToClipboard>
          </div>
          <textarea
            className="bg-gray-200 rounded-lg resize-none outline-none p-2 text-xs h-1/6 md:h-96"
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="text-center md:text-left">
            <button
              onClick={shareHandler}
              className="bg-gray-200 mt-5 px-3 py-2 rounded text-cyan-600 font-bold hover:bg-cyan-700 hover:text-gray-200 transition-all text-lg"
            >
              share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ShareData> = async () => {
  const result: ShareData = await (
    await axios.get(`http://localhost:3000/api`)
  ).data;

  return {
    props: result,
  };
};

export default Home;
