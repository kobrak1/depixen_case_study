import CardForm from "./CardForm/CardForm"
import { useMain } from "../../context/MainProvider"
import './Card.css'
import Title from "./Title/Title"

const Card = () => {
    const {
        title,
        content,
        image,
        isEditingTitle,
        isEditingContent,
        isEditingImage,
        cardClass,
        saveCardData,
    } = useMain()

    return (
        <div className="main-card">
            <Title />
            <CardForm 
                title={title}
                content={content}
                image={image}
                isEditingTitle={isEditingTitle}
                isEditingContent={isEditingContent}
                isEditingImage={isEditingImage}
                cardClass={cardClass}
                saveCardData={saveCardData}
            />
        </div>
    )
}

export default Card