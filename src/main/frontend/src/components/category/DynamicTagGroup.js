import {useEffect, useRef, useState} from "react";
import {Icon, IconButton, Input, Tag, TagGroup} from "rsuite";

const DynamicTagGroup = ({ subjects, setSubjects }) => {
    const prevSubjects = [...subjects]
    const [ typing, setTyping ] = useState(false)
    const [ inputValue, setInputValue ] = useState('')
    let inputRef = useRef()

    useEffect(() => {
        return () => {
            setSubjects(prevSubjects)
        }
    }, [])

    useEffect(() => {
        if (typing) {
            inputRef.focus()
        }
    }, [typing]);

    useEffect(() => {
        setSubjects(subjects)
    }, [subjects])

    const handleInputConfirm = () => {
        const currentSubjects = [...subjects]

        if (!currentSubjects.includes(inputValue)) {
            const nextSubjects = inputValue ? [...currentSubjects, inputValue] : subjects
            setSubjects(nextSubjects)
        }

        setTyping(false)
        setInputValue('')
    }

    const handleTagRemove = (tag) => {
        const nextSubjects = subjects.filter(item => item !== tag)
        setSubjects(nextSubjects)
    }

    const renderInput = () => {
        if (typing) {
            return (
                <Input className='d-inline-block ms-1 rounded-pill' size='xs' style={{width: 70}} inputRef={ref => {inputRef = ref}}
                       value={inputValue} onChange={value => setInputValue(value)} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
            )
        }

        return (
            <IconButton className='d-inline-block ms-1 rounded-circle' onClick={() => setTyping(true)} icon={<Icon icon='plus'/>} appearance='primary' color='orange' size='xs' />
        )
    }

    return (
        <TagGroup className='my-3 p-2'>
            {
                subjects.map((item, index) => (
                    <Tag
                        key={index} closable color='orange' className='rounded-pill'
                        onClose={() => {handleTagRemove(item);}}
                    >
                        {item}
                    </Tag>
                ))
            }
            {renderInput()}
        </TagGroup>
    )
}

export default DynamicTagGroup