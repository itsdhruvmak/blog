import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Package, Folder, Trash2, X, UploadCloud, CheckCircle, ExternalLink } from 'lucide-react';
import api from '../api/axios'
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'blogs'
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: '',
        stock: '',
    });
    const [blogFormData, setBlogFormData] = useState({
        title: '',
        episode: '',
        date: '',
        link: '',
        description: '',
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

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/api/blogs');
            if (response.data.success) {
                setBlogs(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch blogs", err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchBlogs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (activeTab === 'inventory') {
            setFormData({ ...formData, [name]: value });
        } else {
            setBlogFormData({ ...blogFormData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const resetForm = () => {
        setEditId(null);
        if (activeTab === 'inventory') {
            setFormData({ name: '', description: '', category: '', subCategory: '', price: '', stock: '' });
        } else {
            setBlogFormData({ title: '', episode: '', date: '', link: '', description: '' });
        }
        setFile(null);
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (file) data.append('image', file);

        try {
            await api.post('/api/items/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            resetForm();
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(blogFormData).forEach(key => data.append(key, blogFormData[key]));
        if (file) data.append('thumbnail', file);

        try {
            await api.post('/api/blogs/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            resetForm();
            fetchBlogs();
        } catch (err) {
            alert(err.response?.data?.message || "Blog upload failed");
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
            price: item.price || '',
            stock: item.stock || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/api/items/edit/${editId}`, formData);
            resetForm();
            fetchProducts();
        } catch (err) {
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await api.delete(`/api/items/delete/${id}`);
            fetchProducts();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await api.delete(`/api/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-lg">
                            <Package size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Inventory</h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Admin Control Panel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* New "Back to Home" Button */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95"
                        >
                            <ExternalLink size={16} />
                            <span className="hidden sm:inline">View Website</span>
                        </Link>

                        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

                        <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                            Session Active
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-10">
                {/* Tab Switcher */}
                <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit mb-8 border border-slate-200">
                    <button
                        onClick={() => { setActiveTab('inventory'); resetForm(); }}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Inventory
                    </button>
                    <button
                        onClick={() => { setActiveTab('blogs'); resetForm(); }}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Blogs
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT: Form Section */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28">
                            <div className="mb-6">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-1">
                                    {editId ? "Update Entry" : activeTab === 'inventory' ? "New Product" : "New Blog Post"}
                                </h2>
                                <p className="text-slate-500 text-sm">Fill in the details to {editId ? 'modify the' : 'add a new'} {activeTab === 'inventory' ? 'product' : 'blog post'}.</p>
                            </div>

                            <form onSubmit={activeTab === 'inventory' ? (editId ? handleUpdateProduct : handleCreateProduct) : handleCreateBlog} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">

                                {activeTab === 'inventory' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Product Name</label>
                                            <input name="name" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm placeholder:text-slate-400" placeholder="e.g. Creator Camera Rig" value={formData.name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Description</label>
                                            <textarea name="description" rows="3" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm placeholder:text-slate-400" placeholder="Describe the product..." value={formData.description} onChange={handleInputChange} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Category</label>
                                                <input name="category" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" value={formData.category} onChange={handleInputChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Sub Category</label>
                                                <input name="subCategory" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" value={formData.subCategory} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Price (₹)</label>
                                                <input type="number" name="price" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" value={formData.price} onChange={handleInputChange} placeholder="0" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Stock</label>
                                                <input type="number" name="stock" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" value={formData.stock} onChange={handleInputChange} placeholder="0" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Blog Title</label>
                                            <input name="title" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm placeholder:text-slate-400" placeholder="e.g. My Creative Journey" value={blogFormData.title} onChange={handleInputChange} required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Episode #</label>
                                                <input name="episode" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" placeholder="e.g. 01" value={blogFormData.episode} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Date</label>
                                                <input name="date" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm" placeholder="e.g. Oct 24, 2024" value={blogFormData.date} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Video/Article Link</label>
                                            <input name="link" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm placeholder:text-slate-400" placeholder="https://youtube.com/..." value={blogFormData.link} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Blog Description</label>
                                            <textarea name="description" rows="3" className="w-full bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 p-4 rounded-xl text-sm placeholder:text-slate-400" placeholder="Short summary of the blog..." value={blogFormData.description} onChange={handleInputChange} />
                                        </div>
                                    </>
                                )}

                                {!editId && (
                                    <div className="pt-2">
                                        <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-all">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud size={24} className="text-slate-500 group-hover:text-blue-500 mb-2" />
                                                <p className="text-xs font-medium text-slate-600">{file ? file.name : `Upload ${activeTab === 'inventory' ? 'Product' : 'Thumbnail'} Image`}</p>
                                            </div>
                                            <input type="file" onChange={handleFileChange} className="hidden" />
                                        </label>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button type="submit" disabled={loading} className="flex-1 bg-slate-900 text-white p-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-50 active:scale-95">
                                        {loading ? "Processing..." : editId ? "Update Product" : activeTab === 'inventory' ? "Create Product" : "Create Blog Post"}
                                    </button>
                                    {editId && (
                                        <button type="button" onClick={resetForm} className="bg-slate-200 text-slate-700 px-6 rounded-xl hover:bg-slate-300 transition-all border border-slate-300">
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                {activeTab === 'inventory' ? 'Live Inventory' : 'Manage Blogs'}
                                <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-md">
                                    {activeTab === 'inventory' ? items.length : blogs.length}
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {activeTab === 'inventory' ? (
                                    items.map((item) => (
                                        <motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={item._id} className="group bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:shadow-md hover:border-blue-200 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-sm">{item.name}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.subCategory}</span>
                                                        {item.price && (
                                                            <>
                                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">₹{item.price}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteProduct(item._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    blogs.map((blog) => (
                                        <motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={blog._id} className="group bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:shadow-md hover:border-blue-200 transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                                                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight text-sm line-clamp-1">{blog.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EP {blog.episode}</span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{blog.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a href={blog.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                    <ExternalLink size={18} />
                                                </a>
                                                <button onClick={() => handleDeleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;