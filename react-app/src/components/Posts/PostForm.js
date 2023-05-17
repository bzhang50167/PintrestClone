import { useState } from "react"

const PostForm = () => {
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')

    const handleAddImage = (e) => {
        setFile(e.target.file[0])
    }

    return (
        <div>
            <form>
                <div>
                    <label>
                        <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleAddImage}
                        className="postImage"
                        >
                        </input>
                    </label>
                </div>
                <div>
                    
                </div>
            </form>
        </div>
    )
}

export default PostForm
