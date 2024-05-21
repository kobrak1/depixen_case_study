import PropTypes from 'prop-types'
import CardForm from '../Card/CardForm/CardForm'
import Title from '../Card/Title/Title'
import './CardsList.css'

const CardsList = ({ cards }) => {
    return (
        <ul className="cards-list">
            {cards.map((card, id) => (
                <li key={id} className="cards-list-item">
                    <Title />
                    <CardForm
                        title={card.title}
                        content={card.content}
                        image={card.image}
                        isEditingTitle={false}
                        isEditingContent={false}
                        isEditingImage={false}
                        cardClass={{}} // Since these cards are not meant to be editable, no need to pass the actual cardClass instance
                        saveCardData={() => {}} // No need to pass save function for listed cards
                    />
                </li>
            ))}
        </ul>
    )
}

CardsList.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string
    })).isRequired
}

export default CardsList
