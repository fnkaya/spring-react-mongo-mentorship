import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getApplicationById} from "../../util/apiCall/ApplicationFormApiCall";
import {Select} from "semantic-ui-react";

const ApplicationDetails = () => {
    const { applicationId } = useParams()
    const [ application, setApplication ] = useState()
    const [ error, setError ] = useState(undefined)

    useEffect(() => {
        getApplicationById(applicationId)
            .then(response => {
                if (response.status === 200) {
                    setApplication(response.data)
                }
                else {
                    setError(response.data)
                }
            })
    }, [])

    return (
        <div className='p-5 mt-5'>
            {
                application && (
                    <>
                        <div>{JSON.stringify(application)}</div>
                    </>
                )
            }
        </div>
    )
}

export default ApplicationDetails