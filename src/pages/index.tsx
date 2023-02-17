import { supportsSessions } from "@argent/x-sessions"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState, useRef } from "react"
import { AccountInterface, number, shortString  } from "starknet"

import styles from "../styles/Home.module.css"

declare const window: any;

if (typeof window !== 'undefined') {
    console.log('window.innerHeight', window.innerHeight);
    window.starknet = {
      number,
      shortString
    };
}

const { encodeShortString, decodeShortString } = shortString;


const Home: NextPage = () => {
    const [from, setFrom] = useState();
    const [result, setResult] = useState<any>();
    const selectRef = useRef<HTMLSelectElement>(null);

    const handleClick = () => {
        try{
            const type = selectRef.current?.value;
            console.log(type);
            switch(type){
                case '1':
                    setResult(number.toBN(from));
                break;
                case '2':
                    setResult(number.toBN(from).toNumber());
                break;
                case '3':
                    setResult(encodeShortString(from || ''));
                break;
                case '4':
                    setResult(decodeShortString(from || ''));
                break;
                case '5':
                    setResult(number.toBN(from).toFelt());
                break;
            }
            console.log(result);
        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Argent x StarkNet test dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
            <div>
                <ul className={styles.ul}>
                    <li>
                        <input value={from} onChange={(evt: any) => {setFrom(evt.target.value)}} style={{ width: 300}} />
                    </li>
                    <li>
                        <select style={{ width: 300}} ref={selectRef}>
                            <option value={1}>number to BN</option>
                            <option value={2}>BN to number</option>
                            <option value={3}>str to felt</option>
                            <option value={4}>felt to str</option>
                            <option value={4}>number to BN toFelt</option>
                        </select>
                    </li>
                    <li>
                        <button onClick={handleClick}>submit</button>
                    </li>
                    <li>
                        <textarea style={{ width: 300, height: 150, resize: 'none'}} value={result} />
                    </li>
                </ul>
            </div>
      </main>
    </div>
  )
}

export default Home
