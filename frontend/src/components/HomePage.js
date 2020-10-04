import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const handlegetRequest = () => {
        axios.get('http://localhost:4000/quotation').then((res) => {
            if (res.data.length > 0) {
                setData(res.data)
                setShowDeletebtn(true)
            } else {
                setData([
                    {
                        _id: 'null',
                        info: 'No entries found'
                    }
                ])
                setShowDeletebtn(false)
            }
        })
    }

    const handlepostRequest = () => {
        let data = {
            info: value,
            valid: true
        }

        if (value == '') {
            alert('Empty')
        } else {
            axios.post('http://localhost:4000/quotation', data).then((res) => {
                console.log("handlegetRequest -> res", res.data)
                if (res.data) {
                    setValue('')
                }
            })
        }
    }

    const handledeleteRequest = (id) => {
        let data = {
            id
        }
        axios.put('http://localhost:4000/quotation', data).then((res) => {
            if (res.data) {
                handlegetRequest()
            }
        })
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const [showDeletebtn, setShowDeletebtn] = useState(false)

    return (
        <div className="App">
            <div className="App">
                <center>
                    <h1>Full Stack Developer Test</h1>
                    <section className="container">
                        <label>
                            Quotation Info:
                                <input type="text" value={value} onChange={(e) => handleChange(e)} />
                        </label>
                    </section>
                    <button onClick={() => { handlegetRequest() }}>GET</button>
                    <button onClick={() => { handlepostRequest() }}>POST</button>
                </center>
                {data.map(data => (
                    <div key={data._id}>
                        { showDeletebtn && <button onClick={() => { handledeleteRequest(data._id) }}>Delete</button>}
                        {data.info}
                    </div>)
                )}
            </div>
        </div>
    );
}