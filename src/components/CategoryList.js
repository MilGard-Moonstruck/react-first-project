export default ({ categories, handleSelectCategory }) => {
    return (
        <div className="category-wrapper">{
            categories.map((category) => (
                <button
                    onClick={() => handleSelectCategory(category)}
                    className="category-btn"
                    key={category}
                >
                    {category}
                </button>
            ))
        }</div>
    )
}