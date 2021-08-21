import {useEffect, useState} from "react";
import {getAllApplicationForms, getAllApplicationFormsByStatus} from "../../util/apiCall/ApplicationFormApiCall";
import ApplicationCard from "./ApplicationCard";
import {Message} from "rsuite";
import {Button, Select} from "semantic-ui-react";

const ApplicationList = () => {
    const [ applications, setApplications ] = useState([])
    const [ selectedStatus, setSelectedStatus ] = useState()
    const [ error, setError ] = useState()

    useEffect( () => {
        fetchAllApplicationsForm()
    }, [])

    useEffect(() => {
       if (selectedStatus) {
           getAllApplicationFormsByStatus(selectedStatus)
               .then(response => {
                   if (response.status === 200) {
                       setApplications(response.data.content)
                   }
                   else {
                       setError(response.data)
                   }
               })
       }
       else {
           fetchAllApplicationsForm()
       }
    }, [selectedStatus])

    const fetchAllApplicationsForm = () => {
        getAllApplicationForms()
            .then(response => {
                if (response.status === 200) {
                    setApplications(response.data.content)
                }
                else {
                    setError(response.data)
                }
            })
    }

    const getStatusList = () => {
        return [
            {key: 'PENDING', value: 'PENDING', text: 'Bekleyen başvurular'},
            {key: 'ACCEPTED', value: 'ACCEPTED', text: 'Kabul edilen başvurular'},
            {key: 'REJECTED', value: 'REJECTED', text: 'Reddedilen başvurular'},
        ]
    }

    return (
        <>
            <div className='mb-5'>
                <Select options={getStatusList()} placeholder='Başvuru durumu seçiniz' onChange={(e, {value}) => setSelectedStatus(value)}/>
                {selectedStatus && (<Button color='black' className='ms-3' onClick={() => setSelectedStatus(undefined)}>TEMİZLE</Button>)}
            </div>
            {
                error && (
                    <Message
                        showIcon
                        closable
                        className='mb-3'
                        type="error"
                        title="Bir hata oluştu"
                        description={error.message}/>
                )
            }
            <div className='row'>
                {
                    applications &&
                    applications.map(application => (
                        <div className="col-4 mb-3">
                            <ApplicationCard key={application.id} application={application} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ApplicationList;