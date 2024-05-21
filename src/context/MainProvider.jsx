import { createContext, useContext, useEffect, useState } from "react"
import { db } from '../firebase/config'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PropTypes from 'prop-types'

export const MainContext = createContext()

export const MainProvider = ({children}) => {
    const [title, setTitle] = useState('New Title')
    const [content, setContent] = useState('New description')
    const [image, setImage] = useState(null)
    const [cards, setCards] = useState([])
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingContent, setIsEditingContent] = useState(false)
    const [isEditingImage, setIsEditingImage] = useState(false)

    const storage = getStorage() // initialize the firebase storage

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "cards"))
            const cardsData = querySnapshot.docs.map(doc => doc.data())
            setCards(cardsData)
        }

        fetchData()
    }, [])

    const saveCardData = async () => {
        const newCard = { title, content, image }
        await addDoc(collection(db, "cards"), newCard)
        setCards(prevCards => [...prevCards, newCard])
    }

    class CardClass {
        constructor(
            setTitle,
            setContent,
            setImage,
            setIsEditingTitle,
            setIsEditingContent,
            setIsEditingImage,
        ) {
            this.setTitle = setTitle
            this.setContent = setContent
            this.setImage = setImage
            this.setIsEditingTitle = setIsEditingTitle
            this.setIsEditingContent = setIsEditingContent
            this.setIsEditingImage = setIsEditingImage
        }

        // title methods
        handleTitleClick = () => {
            setIsEditingTitle(true)
        }

        handleTitleChange = (e) => {
            setTitle(e.target.value)
        }

        handleTitleBlur = async () => {
            setIsEditingTitle(false)
        }

        // content methods
        handleContentClick = () => {
            setIsEditingContent(true)
        }

        handleContentChange = (e) => {
            setContent(e.target.value)
        }

        handleContentBlur = async () => {
            setIsEditingContent(false)
        }

        // image methods
        handleImageClick = () => {
            setIsEditingImage(true)
        }

        handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                const storageRef = ref(storage, `images/${file.name}`)
                await uploadBytes(storageRef, file)
                const imageUrl = await getDownloadURL(storageRef)
                this.setImage(imageUrl)
            }
        }
        
        
        handleImageBlur = async () => {
            setIsEditingImage(false)
        }

        // handle refresh after saving the data
        handleDataRefresh = () => {
            setTitle('New Title')
            setContent('New description')
            setImage(null)
        }
    }

    const cardClass = new CardClass(setTitle, setContent, setIsEditingTitle, setIsEditingContent, setIsEditingImage, setImage)

    const values = {
        title,
        content,
        image,
        isEditingTitle,
        isEditingContent,
        isEditingImage,
        cardClass,
        saveCardData,
        cards,
    }

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMain = () => {
    const context = useContext(MainContext)

    // check if the context used inside the MainProvider
    if (!context) {
        throw new Error('This useMain hook must be called inside the MainProvider')
    }

    return context
}

MainProvider.propTypes = {
    children: PropTypes.node
}