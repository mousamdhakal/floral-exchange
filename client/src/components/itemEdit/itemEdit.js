import React, { useState } from 'react'
import FlowerPlaceholder from '../../components/FlowerPlaceholder/FlowerPlaceholder'
import { Typography } from '@mui/material'
import Button from '../Button/Button'
import CloseIcon from '@mui/icons-material/Close';
import Dropdown from '../Dropdown/Dropdown'
import Tags from '../Tags/Tags'
import Description from '../Description/Description'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FormInput from '../../components/Input/FormInput'
import { InputLabel } from '@mui/material'

import './itemEdit.scss'

const ItemEdit = ({ props, onClose }) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [tags, setTags] = useState(props.tags);
    const [type, setType] = useState(props.type);
    // console.log(title, description, tags, type);

    return (
        <div className="edit-container">
            <div className="edit-title">
                <Typography classes={{ h5: 'page-heading' }} variant="h5">
                    Edit your Post
                </Typography>
                <div className="close-button">
                    <CloseIcon onClick={onClose} />
                </div>
            </div>
            <div className="column-divider">
                <div className="left-container">
                    <div className={'center-content-vertical'}>
                        <FlowerPlaceholder />
                        <div className="update-button">
                            <Button
                                variant={'contained'}
                                containedButton={'contained-full-button half-width mt-24'}
                                startIcon={<AddRoundedIcon />}
                            >
                                Update Image
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    <InputLabel classes={{ root: 'form-input-label' }}>Title</InputLabel>
                    <FormInput
                        name="Title"
                        id="post-title"
                        value={title}
                        containerClass="inputWithMarginBottom"
                        handleChange={(e) => { setTitle(e.target.value) }}
                    />
                    <InputLabel classes={{ root: 'form-input-label' }}>Type</InputLabel>
                    <Dropdown
                        data={[
                            { name: 'Tree', value: 'tree' },
                            { name: 'Flower', value: 'flower' },
                            { name: 'Plant', value: 'plant' },
                        ]}
                        value={type}
                        containerClass="dropdownWithMarginBottom"
                        setDropdownValue={(e) => { setType(e.target.value) }}
                    />
                    <Tags
                        name="Tags"
                        id="post-tags"
                        value={tags}
                        containerClass="inputWithMarginBottom"
                        handleChange={(e) => { setType(e.target.value) }}
                    />
                    <Description
                        name="Description"
                        id="post-description"
                        value={description}
                        handleChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
            </div>
            <div className="editItem-actions">
                <Button
                    containedButton={'contained-outlined-button quarter-width m-24'}
                    handleClick={() => onClose()}
                >
                    Reset
                </Button>
                <Button
                    containedButton={'contained-outlined-button quarter-width m-24'}
                    handleClick={() => onClose()}
                >
                    Cancel
                </Button>
                <Button
                    containedButton={'contained-full-button quarter-width m-24'}
                    handleClick={() => onClose()}
                >
                    Save Post
                </Button>
            </div>
        </div>
    )
}

export default ItemEdit