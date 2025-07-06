import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api/restaurant';
import Footer from '../components/footer/Footer'
const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error('Failed to load categories', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <p style={{ padding: '1rem' }}>Loading categories...</p>;

    const filteredCategories = categories.filter(
        (cat) =>
            typeof cat.display_name === 'string' &&
            cat.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '10px' }}>
            <input
                type="text"
                placeholder="Search for categories..."
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

            {filteredCategories.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: '#888' }}>
                    No categories match your search
                </p>
            ) : (
                <div style={grid}>
                    {filteredCategories.map((cat) => (
                        <div
                            key={cat.id}
                            style={card}
                            onClick={() => navigate(`/items/${cat.id}`)}
                        >
                            <img src={cat.image} alt={cat.name} style={img} />
                            <div style={overlayText}>{cat.display_name}</div>

                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
};

const card = {
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};


const img = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const overlayText = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontWeight: 'bold',
    color: '#fff',
    padding: '0.5rem',
    textAlign: 'center',
    fontSize: '1.1rem',
};

export default CategoriesPage;
