import {useDispatch, useSelector} from "react-redux";
import {Icon, IconButton, Input, InputGroup, Loader, Nav, Pagination} from "rsuite";
import {useEffect, useState} from "react";
import {fetchCategories} from "../../action/categoryActions";
import {
    getAllPosts,
    getAllPostsByCategory,
    getAllPostsBySubject,
    searchPost
} from "../../util/apiCall/PostApiCall";
import PostPanel from "./PostPanel";
import {Message} from "semantic-ui-react";

const Search = () => {
    const { pending, categories } = useSelector(state => state.categoryState.toJS())
    const [ selectedCategory, setSelectedCategory ] = useState()
    const [ selectedSubject, setSelectedSubject ] = useState()
    const [ searchKeyword, setSearchKeyword ] = useState('')
    const [ activeCategoryTab, setActiveCategoryTab ] = useState()
    const [ activeSubjectTab, setActiveSubjectTab ] = useState()
    const [ posts, setPosts ] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
        fetchAllMentors()
    }, [])

    useEffect(() => {
        setActiveSubjectTab(undefined)
        if (selectedCategory) {
            getAllPostsByCategory(selectedCategory.name)
                .then(response => {
                    if (response.status === 200) {
                        setPosts(response.data.content)
                    }
                })
        }
    }, [selectedCategory])

    useEffect(() => {
        if (selectedSubject) {
            getAllPostsBySubject(selectedSubject)
                .then(response => {
                    if (response.status === 200) {
                        setPosts(response.data.content)
                    }
                })
        }
    }, [selectedSubject])

    useEffect(() => {
        if (searchKeyword !== '') {
            searchPost(searchKeyword)
                .then(response => {
                    if (response.status === 200 && response.data.content.length > 0) {
                        setPosts(response.data.content)
                        clearFilters()
                    }
                })
        }
        else {
            fetchAllMentors()
        }
    }, [searchKeyword])

    const fetchAllMentors = () => {
        getAllPosts()
            .then(response => {
                if (response.status === 200) {
                    setPosts(response.data.content)
                }
            })
    }

    const clearFilters = () => {
        setSelectedCategory(undefined)
        setSelectedSubject(undefined)
        setActiveCategoryTab(undefined)
        setActiveSubjectTab(undefined)
    }

    const onClear = () => {
        clearFilters()
        setSearchKeyword('')
        fetchAllMentors()
    }


    return (
        <div className='row p-5'>
            <div className="col-2 mb-4">
                {(selectedCategory || searchKeyword !== '') && (<IconButton color='cyan' icon={<Icon icon='eraser' />} onClick={onClear}>TEMİZLE</IconButton>)}
            </div>
            <div className="col-10 d-flex  mb-4">
                <InputGroup inside style={{width: '100vh'}}>
                    <Input placeholder='Mentor ara...' value={searchKeyword} onChange={(value) => setSearchKeyword(value)}/>
                    <InputGroup.Button>
                        <Icon icon='search' />
                    </InputGroup.Button>
                </InputGroup>
            </div>
            <div className='col-2'>
                {
                    categories && (
                        <Nav vertical appearance="subtle" activeKey={activeCategoryTab} onSelect={setActiveCategoryTab} className='mt-5'>
                            {
                                categories.map(category => (
                                    <Nav.Item key={category.id} eventKey={category.name} onSelect={() => setSelectedCategory(category)}>{category.name}</Nav.Item>
                                ))
                            }
                        </Nav>
                    )
                }
            </div>
            <div className='col-10'>
                {
                    selectedCategory && (
                        <Nav appearance="subtle" activeKey={activeSubjectTab} onSelect={setActiveSubjectTab}>
                            {
                                selectedCategory.subjects.map(subject => (
                                    <Nav.Item key={subject} eventKey={subject} onSelect={() => setSelectedSubject(subject)}>{subject}</Nav.Item>
                                ))
                            }
                        </Nav>
                    )
                }

                <div className="row">
                    {
                        posts &&
                        posts.map(post => (
                            <PostPanel key={post.id} post={post} searchKeyword={searchKeyword}/>
                        ))
                    }
                    {
                        posts &&
                        posts.length === 0 && (
                            <Message
                                icon='braille'
                                header='Seçtiğiniz kategoriye veya konuya ait bir post bulunamadı'
                                className='mt-3'
                            />
                        )
                    }
                </div>
            </div>

            {pending && (<Loader backdrop content="loading..." vertical />) }
        </div>
    )
}

export default Search;