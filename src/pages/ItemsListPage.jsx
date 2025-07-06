import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchItemsByCategory, fetchCategories } from '../api/restaurant';
import ItemCard from '../components/itemcard/ItemCard';
import ItemDetailsModal from '../components/ItemDetailsModal';

const ItemsListPage = () => {
    const { categoryId: initialCategoryId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);


    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX.current;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };


    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        loadCategories();
    }, []);


    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            try {
                const data = await fetchItemsByCategory(activeCategoryId);
                setItems(data);
            } catch (err) {
                console.error('Failed to load items', err);
            } finally {
                setLoading(false);
            }
        };
        if (activeCategoryId) {
            loadItems();
        }
    }, [activeCategoryId]);

    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description &&
                item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{ padding: '10px 0px' }}>
            <input
                type="text"
                placeholder="Search for Dishes, Drinks ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    display: 'block',
                    margin: '0px auto',
                    width: '94%',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    border: '2px solid #00628e',
                    backgroundColor: '#f3f3f3',
                    borderRadius: '6px',
                    outline: 'none'
                }}
            />


            <div
                ref={scrollRef}
                style={categoryTabs}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="hide-scroll"
            >
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveCategoryId(cat.id);
                            navigate(`/items/${cat.id}`);
                        }}
                        style={{
                            ...categoryBtn,
                            ...(+cat.id === +activeCategoryId ? activeBtn : {})
                        }}
                    >
                        {cat.display_name}
                    </button>
                ))}
            </div>


            {loading ? (
                <p>Loading items...</p>
            ) : filteredItems.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: '#888' }}>
                    No categories match your search
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f3f3f3', padding: '30px 20px' }}>
                    {filteredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>
            )}

            <ItemDetailsModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    );
};

export default ItemsListPage;

// 🧾 Styles
const categoryTabs = {
    display: 'flex',
    overflowX: 'auto',
    gap: '0.5rem',
    paddingBottom: '1rem',
    cursor: 'grab',
    userSelect: 'none',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
};

const categoryBtn = {
    padding: '0.4rem 1.5rem',
    borderRadius: '6px',
    border: '1px solid #005074',
    background: 'white',
    color: '#005074',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold'
};

const activeBtn = {
    background: '#005074',
    color: '#fff',
    border: '1px solid white',
};
