import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import PlusIcon from '../PlusIcon/PlusIcon'
import './CardForm.css'

const CardForm = ({
    title,
    content,
    image,
    isEditingTitle,
    isEditingContent,
    isEditingImage,
    cardClass,
    saveCardData,
    }) => {
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const imageRef = useRef(null)
    
    // Effect hooks to focus and select input elements when editing
    useEffect(() => {
        if (isEditingTitle && titleRef.current) {
            titleRef.current.focus();
            titleRef.current.select();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingContent && contentRef.current) {
            contentRef.current.focus();
            contentRef.current.select();
        }
    }, [isEditingContent]);

    useEffect(() => {
        if (isEditingImage && imageRef.current) {
            imageRef.current.click()
        }
    }, [isEditingImage])

    // Event listener to detect click outside of the card-image container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (imageRef.current && !imageRef.current.contains(event.target)) {
                cardClass.handleImageBlur();
            }
        }

        if (isEditingImage) {
            document.addEventListener('mousedown', handleClickOutside);
        } 

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isEditingImage, cardClass])

    // function that handles saving the data
    const handleSubmit = async (event) => {
        event.preventDefault()
        await saveCardData()
        cardClass.handleDataRefresh()
        alert("Data saved successfully!");
    }

    // JSX for the CardForm component
    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card-title"  onClick={cardClass.handleTitleClick}>
                    {isEditingTitle
                        ? <input
                            ref={titleRef}
                            type="text"
                            value={title}
                            maxLength={18}
                            onChange={e => cardClass.handleTitleChange(e)}
                            onBlur={cardClass.handleTitleBlur}
                            placeholder='New Title'
                          />
                        : <h2>{title}</h2>
                    }
                </div>
                <div className="card-content" onClick={cardClass.handleContentClick}>
                    {isEditingContent
                        ? <textarea 
                            ref={contentRef}
                            value={content}
                            onChange={e => cardClass.handleContentChange(e)}
                            onBlur={cardClass.handleContentBlur}
                            placeholder='New description...'
                          />
                        : <p>{content}</p>
                    }                  
                </div>
                <div className="card-image">
                    {!image
                        ?   <div className="plus-icon" onClick={cardClass.handleImageClick}>
                                <PlusIcon />
                                <p>GÖRSEL</p>
                            </div>
                        :   <img 
                                src={image} 
                                alt="Uploaded visual content"
                                onClick={cardClass.handleImageClick}
                            />
                    }
                    <input
                        ref={imageRef}
                        type='file'
                        onChange={e => cardClass.handleImageChange(e)}
                        accept='image/*'
                        style={{display: 'none'}}
                    />
                </div>
                <button className='visible' type='submit' disabled={!content || !title || !image}>
                    Create
                </button>
            </form>
        </div>
    )
}

CardForm.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.node,
    isEditingTitle: PropTypes.bool.isRequired,
    isEditingContent: PropTypes.bool.isRequired,
    isEditingImage: PropTypes.bool.isRequired,
    cardClass: PropTypes.instanceOf(Object).isRequired,
    saveCardData: PropTypes.func.isRequired,
}

export default CardForm