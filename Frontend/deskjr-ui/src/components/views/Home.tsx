import { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';

const Home = (props: any) => {
    const id = 'guid-from-db'
    const [employee, setEmployee] = useState<any>(null);
    useEffect(() => {
        const fetchedEmployee = async () => {
            try {
                const fetchedEmployeeData = await EmployeeService.getEmployeeById(id);
                setEmployee(fetchedEmployeeData);
            }
            catch (error) {
                console.error("Error fetching employee data: ", error);
            }
        };
        fetchedEmployee();
    }, [id]);
    return <>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="p-3 my-3 bg-primary text-white">
                        <h1 className="mt-4">{employee ? employee.name : 'Loading...'}</h1>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>İzindeki Çalışanlar</h2>
                    <p>Açıklama:</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Header 1</th>
                                <th>Header 2</th>
                                <th>Header 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                            </tr>
                            <tr>
                                <td>Data 4</td>
                                <td>Data 5</td>
                                <td>Data 6</td>
                            </tr>
                            <tr>
                                <td>Data 7</td>
                                <td>Data 8</td>
                                <td>Data 9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>Yaklaşan Tatiller</h2>
                    <p>Açıklama:</p>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Tatiller</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data 1</td>
                            </tr>
                            <tr>
                                <td>Data 2</td>
                            </tr>
                            <tr>
                                <td>Data 3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>;
};

export default Home;
