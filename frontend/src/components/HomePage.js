import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'

export default function HomePage() {

    const [data, setData] = useState([])
    const [colums, setColums] = useState([
        { title: 'Info', field: 'info' }
    ])
    useEffect(() => {
        handlegetRequest()
    }, []);

    const handlegetRequest = () => {
        axios.get('http://localhost:4000/quotation').then((res) => {
            if (res.data.length > 0) {
                setData(res.data)
                console.log("handlegetRequest -> res.data", res.data)
            } else {
                setData([])
            }
        })
    }

    const handlepostRequest = (newdata) => {
        let data = {
            info: newdata.info,
            valid: true
        }

        if (newdata.info ==='') {
            alert('Empty')
        } else {
            axios.post('http://localhost:4000/quotation', data).then((res) => {
                console.log("handlegetRequest -> res", res.data)
                if (res.data) {
                    handlegetRequest()
                }
            })
        }
    }

    const handledeleteRequest = (id) => {
        console.log("handledeleteRequest -> id", id)
        let data = {
            id
        }
        axios.put('http://localhost:4000/quotation', data).then((res) => {
            if (res.data) {
                handlegetRequest()
            }
        })
    }

    return (
        <div className="App">
            <div className="App">
                <center>
                    <h1>Full Stack Developer Test</h1>
                </center>

                {/* Table */}
                <MaterialTable
                    title="Quotation"
                    columns={colums}
                    data={data}
                    actions={[
                        {
                            icon: 'delete',
                            tooltip: 'Delete',
                            onClick: (event, rowData) => {
                                handledeleteRequest(rowData._id)
                            }
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                if (Object.keys(newData).length === 0 && newData.constructor === Object) {
                                    alert('Empty')
                                    resolve();
                                } else {
                                    setTimeout(() => {
                                        handlepostRequest(newData)
                                        resolve();
                                    }, 500)
                                }
                            }),
                    }}
                    options={{
                        search: false,
                        actionsColumnIndex: -1,
                        emptyRowsWhenPaging: false,
                        showFirstLastPageButtons: false,
                        paging: false,
                        headerStyle: { fontSize: 13, fontWeight: 'bold', backgroundColor: '#F5F5F5' }
                    }}
                />
            </div>
        </div>
    );
}