import React from 'react'
import { Button, TextFieldInput } from '../../components/GnosisReact'
import DashboardLayout from '../../components/layout/DashboardLayout'
import styles from '../../styles/Submit.module.css'

const Submit = () => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [link, setLink] = React.useState('')

    function onSubmit() {
    }
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h3>Submit Project</h3>
                <TextFieldInput
                    label="Title"
                    name='title'
                    fullWidth
                    placeholder="Enter your title"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <TextFieldInput
                    label="Description"
                    name='Description'
                    fullWidth
                    rows={10}
                    multiline
                    placeholder="Enter your description"
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <TextFieldInput
                    label="Link"
                    name='Link'
                    fullWidth
                    placeholder="Enter your link"
                    onChange={(e) => setLink(e.currentTarget.value)}
                />
                <Button size='md'>Submit</Button>
            </div>
        </div>
    )
}

Submit.getLayout = function getLayout(page) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>

    )
}

export default Submit