import {Badge, Button, Panel, Rate, Tag} from "rsuite";
import {Link} from "react-router-dom";
import Highlighter from 'react-highlight-words'

const PostPanel = (props) => {
    const { post, searchKeyword } = props
    const keywords = searchKeyword.split(" ")

    return(
        <Panel shaded className='m-3 col-5 bg-light'>
            <Badge className={post.owner.available ? 'bg-success' : 'bg-danger'}/>
            <div className='d-inline-block ms-2'>
                {post.owner.account.name}
            </div>
            <div className='my-3'>
                <Tag color='blue'>{post.category.name}</Tag> {post.category.subjects.map(subject => (<Tag key={subject} color='violet'>{subject}</Tag>))}
            </div>
            <div className='text-truncate'>
                <Highlighter searchWords={keywords} className='text-muted' textToHighlight={post.description} />
            </div>
            <Link to={`/post/${post.id}`} ><Button size='xs' appearance='ghost' color='cyan' className='float-end my-3'>DETAY</Button></Link>
        </Panel>
    )
}

export default PostPanel