import { useEffect, useRef, useState } from 'react';
import './translator.css';
import axios from 'axios';
import codeData from './codeData.js';

const Translator = () => {


    const [result, setResult] = useState('');
    const ref = useRef();
    const ref1 = useRef();


    


    async function fetchData(encodedParams) {

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '6f07d071e0mshf0f49e48170dc4ep11be79jsn351838f8c4ec',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };


        try {
            const response = await axios.request(options);
            console.log(response.data.data.translatedText);
            setResult(response.data.data.translatedText);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const TranslateData = () => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'auto');
        encodedParams.set('target_language', ref.current.value);
        encodedParams.set('text', ref1.current.value);
        fetchData(encodedParams);
    }




    return (
        <div className='translate'>
            <h1>TRANSLATOR</h1>
            <div className='translator'>
                <select ref={ref}>
                    {
                        codeData.map((item) => {
                            return (
                                <option value={item.code} key={item.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <input ref={ref1} type='text' placeholder='Enter Text'></input>

                <button onClick={TranslateData}>Translate</button>

            </div>
            <p>{result}</p>
        </div>
    )
}


export default Translator;