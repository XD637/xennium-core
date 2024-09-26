'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../globals.css";
import CodeSnippet from "../components/CodeSnippet1";

const Eth = "0x9cd904CA87C78A365AEAB1fbD3A8FDd8E63ce082";
const sepEth = "0x20E6827DC9FC44C747f551A08aF8244bA14046a6";

export default function Support() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-black opacity-90 pt-12 ">
        Support us with your ETHs
        <span className="blink">!</span>
      </h1>
      <div className="w-full max-w-4xl mx-auto mt-12">
        <CodeSnippet code={Eth} language="ETH" />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-12">
        <CodeSnippet code={sepEth} language="SepETH" />
      </div>
    </main>
  );
}
