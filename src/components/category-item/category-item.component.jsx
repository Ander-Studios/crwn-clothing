import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <div className="category-container">
          <div
           className='background-image' 
           style={{ // You can append a custom style, e.g. if you want a background image, 
            backgroundImage: `url(${imageUrl})`, //You can pass a string, and the url string value which you would need to use the backticks, this allows you to use a string value within another string. 
          }}
        />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>          
    );
};

export default CategoryItem;