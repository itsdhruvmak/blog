import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/api/items/all');
            setItems(response.data.data);
        } catch (err) {
            console.error("Failed to fetch items", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        if (file) data.append('image', file);

        try {
            const response = await api.post('/api/items/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Product Created!");
            setFormData({ name: '', description: '', category: '', subCategory: '' });
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (item) => {
        setEditId(item._id);
        setFormData({
            name: item.name,
            description: item.description,
            category: item.category,
            subCategory: item.subCategory,
        });
        window.scrollTo(0, 0);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/api/items/edit/${editId}`, formData);
            alert("Product Updated!");
            setEditId(null);
            setFormData({ name: '', description: '', category: '', subCategory: '' });
            fetchProducts();
        } catch (err) {
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {editId ? "Edit Product" : "Add New Product"}
            </h1>
            <form onSubmit={editId ? handleUpdateProduct : handleCreateProduct} className="space-y-4 mb-12 p-6 bg-white shadow-md rounded">
                <input name="name" placeholder="Product Name" className="w-full p-2 border" value={formData.name} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Description" className="w-full p-2 border" value={formData.description} onChange={handleInputChange} />
                <div className="flex gap-4">
                    <input name="category" placeholder="Category" className="flex-1 p-2 border" value={formData.category} onChange={handleInputChange} required />
                    <input name="subCategory" placeholder="Sub Category" className="flex-1 p-2 border" value={formData.subCategory} onChange={handleInputChange} required />
                </div>
                {!editId && <input type="file" onChange={handleFileChange} className="w-full" />}

                <div className="flex gap-2">
                    <button type="submit" disabled={loading} className="bg-black text-white px-6 py-2 hover:bg-gray-800 disabled:bg-gray-400">
                        {loading ? "Processing..." : editId ? "Update Product" : "Create Product"}
                    </button>
                    {editId && (
                        <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', description: '', category: '', subCategory: '' }); }} className="bg-gray-300 px-6 py-2">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-xl font-bold mb-4">Existing Products</h2>
            <div className="grid gap-4">
                {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 bg-white border rounded shadow-sm">
                        <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.category} - {item.subCategory}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => startEdit(item)}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;