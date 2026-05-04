import { useEffect, useState } from 'react';
import { galleryAPI } from '../services/api';
import { Container, Row, Col, Card, Spinner, Modal, Image, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaHeart, FaRegHeart, FaTrash, FaEdit, FaComment, FaPlus, FaPlay, FaStar, FaRegStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const GalleryPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState('image');
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ title: '', imageUrl: '', description: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, isAdmin } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || 'https://salon-1-1.onrender.com/api';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await galleryAPI.getAll();
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast.error('Please upload an image or video file');
      return;
    }
    
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File too large. Max 100MB for videos');
      return;
    }
    
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;
    
    const formData = new FormData();
    const isImage = selectedFile.type.startsWith('image/');
    formData.append(isImage ? 'image' : 'video', selectedFile);
    
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = isImage ? '/upload/image' : '/upload/video';
      const res = await axios.post(`${API_URL}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        timeout: 120000
      });
      toast.success(isImage ? 'Image uploaded!' : 'Video uploaded!');
      return isImage ? res.data.imageUrl : res.data.videoUrl;
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message));
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    let imageUrl = formData.imageUrl;
    
    if (selectedFile) {
      const uploadedUrl = await uploadFile();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        return;
      }
    }
    
    if (!imageUrl) {
      toast.error('Please select an image/video or provide a URL');
      return;
    }
    
    try {
      if (editingPost) {
        await galleryAPI.update(editingPost._id, { ...formData, imageUrl });
        toast.success('Post updated!');
      } else {
        await galleryAPI.create({ ...formData, imageUrl });
        toast.success('Post created!');
      }
      setShowPostModal(false);
      setEditingPost(null);
      setFormData({ title: '', imageUrl: '', description: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to save post');
    }
  };

  const handleLike = async (id) => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    try {
      await galleryAPI.like(id);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to like post');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    try {
      await galleryAPI.addComment(selectedPost._id, { text: commentText });
      toast.success('Comment added!');
      setCommentText('');
      setShowCommentModal(false);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to add comment');
    }
  };

  const handleAddRating = async () => {
    if (ratingValue === 0) {
      toast.error('Please select a rating');
      return;
    }
    try {
      await galleryAPI.addRating(selectedPost._id, { rating: ratingValue });
      toast.success(`You rated this ${ratingValue} stars!`);
      setRatingValue(0);
      setShowRatingModal(false);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to add rating');
    }
  };

  const deletePost = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await galleryAPI.delete(id);
        toast.success('Post deleted');
        fetchPosts();
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  const deleteComment = async (postId, commentId) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await galleryAPI.deleteComment(postId, commentId);
        toast.success('Comment deleted');
        fetchPosts();
      } catch (err) {
        toast.error('Failed to delete comment');
      }
    }
  };

  const openMediaModal = (url, type) => {
    setSelectedMedia(url);
    setSelectedMediaType(type);
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const getUserRating = (ratings) => {
    if (!user || !ratings) return 0;
    const userRating = ratings.find(r => r.userId === user._id);
    return userRating ? userRating.value : 0;
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Gallery</h2>
        {isAdmin && (
          <Button variant="primary" onClick={() => setShowPostModal(true)}>
            <FaPlus className="me-2" /> Add New Post
          </Button>
        )}
      </div>

      <Row>
        {posts.map(post => {
          const isVideo = post.imageUrl && post.imageUrl.match(/\.(mp4|mov|avi|webm|mkv)$/i);
          const avgRating = calculateAverageRating(post.ratings);
          const userRating = getUserRating(post.ratings);
          const totalRatings = post.ratings?.length || 0;
          
          return (
            <Col md={4} key={post._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                {post.imageUrl && (
                  <div 
                    style={{ position: 'relative', cursor: 'pointer', backgroundColor: '#000', minHeight: '250px' }}
                    onClick={() => openMediaModal(post.imageUrl, isVideo ? 'video' : 'image')}
                  >
                    {isVideo ? (
                      <>
                        <video 
                          src={post.imageUrl} 
                          style={{ height: '250px', width: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          borderRadius: '50%',
                          padding: '15px',
                          color: 'white'
                        }}>
                          <FaPlay size={30} />
                        </div>
                      </>
                    ) : (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        style={{ height: '250px', width: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text className="text-muted">{post.description}</Card.Text>
                  
                  {/* Rating Section */}
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        {[1, 2, 3, 4, 5].map(star => (
                          <FaStar key={star} color={star <= avgRating ? '#ffc107' : '#e4e5e9'} className="me-1" />
                        ))}
                        <span className="ms-2 text-muted">({avgRating})</span>
                      </div>
                      {user && !isAdmin && (
                        <Button 
                          size="sm" 
                          variant="outline-warning" 
                          onClick={() => {
                            setSelectedPost(post);
                            setRatingValue(userRating);
                            setShowRatingModal(true);
                          }}
                        >
                          {userRating > 0 ? `Rate (${userRating}★)` : 'Rate This'}
                        </Button>
                      )}
                    </div>
                    <small className="text-muted">{totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}</small>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <button className="btn btn-link text-danger p-0" onClick={() => handleLike(post._id)}>
                      {post.likes?.includes(user?._id) ? <FaHeart /> : <FaRegHeart />}
                      <span className="ms-1">{post.likes?.length || 0} likes</span>
                    </button>
                    <button className="btn btn-link text-primary p-0" onClick={() => {
                      setSelectedPost(post);
                      setShowCommentModal(true);
                    }}>
                      <FaComment /> <span className="ms-1">{post.comments?.length || 0} comments</span>
                    </button>
                  </div>
                  
                  {isAdmin && (
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <Button size="sm" variant="warning" onClick={() => {
                        setEditingPost(post);
                        setFormData({ title: post.title, imageUrl: post.imageUrl, description: post.description });
                        setPreviewUrl(post.imageUrl);
                        setSelectedFile(null);
                        setShowPostModal(true);
                      }}>
                        <FaEdit /> Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => deletePost(post._id)}>
                        <FaTrash /> Delete
                      </Button>
                    </div>
                  )}
                  
                  {post.comments?.slice(0, 3).map(comment => (
                    <div key={comment._id} className="mt-2 p-2 bg-light rounded small">
                      <div className="d-flex justify-content-between">
                        <strong>{comment.userId?.name || 'User'}:</strong>
                        {(isAdmin || comment.userId?._id === user?._id) && (
                          <Button size="sm" variant="link" className="text-danger p-0" onClick={() => deleteComment(post._id, comment._id)}>
                            <FaTrash size={10} />
                          </Button>
                        )}
                      </div>
                      <p className="mb-0">{comment.text}</p>
                      <small className="text-muted">{new Date(comment.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {posts.length === 0 && !loading && (
        <div className="text-center py-5">
          <p>No gallery posts yet. {isAdmin && 'Click "Add New Post" to upload images or videos.'}</p>
        </div>
      )}

      {/* Media Modal */}
      <Modal show={selectedMedia} onHide={() => setSelectedMedia(null)} centered size="xl" fullscreen="lg-down">
        <Modal.Body className="p-0 bg-dark" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {selectedMediaType === 'video' ? (
            <video 
              src={selectedMedia} 
              controls 
              autoPlay 
              style={{ maxWidth: '100%', maxHeight: '90vh' }}
              className="rounded"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image src={selectedMedia} fluid style={{ maxHeight: '90vh', objectFit: 'contain' }} />
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-0">
          <Button variant="secondary" onClick={() => setSelectedMedia(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Rating Modal */}
      <Modal show={showRatingModal} onHide={() => { setShowRatingModal(false); setRatingValue(0); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate this work</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>{selectedPost?.title}</h5>
          <div className="my-4">
            <div className="d-flex justify-content-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  size={40}
                  className="cursor-pointer"
                  color={(hoverRating || ratingValue) >= star ? '#ffc107' : '#e4e5e9'}
                  onClick={() => setRatingValue(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <p className="mt-3 text-muted">
              {ratingValue > 0 ? `You selected ${ratingValue} star${ratingValue > 1 ? 's' : ''}` : 'Click on a star to rate'}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRatingModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddRating} disabled={ratingValue === 0}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Post Modal */}
      <Modal show={showPostModal} onHide={() => { setShowPostModal(false); setEditingPost(null); setFormData({}); setSelectedFile(null); setPreviewUrl(null); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingPost ? 'Edit Post' : 'Add New Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitPost}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Upload Image or Video (Up to 100MB)</Form.Label>
              <div className="border rounded p-3 text-center">
                <Form.Control 
                  type="file" 
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="mb-2"
                />
                {uploading && (
                  <div className="text-center">
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span>Uploading... Please wait</span>
                  </div>
                )}
                {(previewUrl || formData.imageUrl) && (
                  <div className="mt-2">
                    {previewUrl && (
                      previewUrl.match(/\.(mp4|mov|avi|webm|mkv)$/i) || formData.imageUrl?.match(/\.(mp4|mov|avi|webm|mkv)$/i) ? (
                        <video src={previewUrl || formData.imageUrl} style={{ maxHeight: '150px' }} controls />
                      ) : (
                        <img src={previewUrl || formData.imageUrl} alt="Preview" style={{ maxHeight: '150px' }} />
                      )
                    )}
                    <Button size="sm" variant="link" onClick={() => { setSelectedFile(null); setPreviewUrl(null); setFormData({...formData, imageUrl: ''}); }}>Remove</Button>
                  </div>
                )}
                <small className="text-muted text-center d-block mt-2">
                  Upload images (JPG, PNG, GIF) up to 10MB<br />
                  Upload videos (MP4, MOV, AVI, WEBM) up to 100MB
                </small>
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : (editingPost ? 'Update' : 'Create Post')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Comments Modal */}
      <Modal show={showCommentModal} onHide={() => { setShowCommentModal(false); setCommentText(''); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comments for {selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost?.comments?.length === 0 && (
            <p className="text-muted">No comments yet. Be the first to comment!</p>
          )}
          {selectedPost?.comments?.map(comment => (
            <div key={comment._id} className="mb-3 p-2 bg-light rounded">
              <div className="d-flex justify-content-between">
                <strong>{comment.userId?.name || 'User'}</strong>
                {(isAdmin || comment.userId?._id === user?._id) && (
                  <Button size="sm" variant="link" className="text-danger p-0" onClick={() => deleteComment(selectedPost._id, comment._id)}>
                    <FaTrash />
                  </Button>
                )}
              </div>
              <p className="mb-0 mt-1">{comment.text}</p>
              <small className="text-muted">{new Date(comment.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
          {user && (
            <div className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Add a comment</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2}
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Write your comment here..."
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddComment}>
                Post Comment
              </Button>
            </div>
          )}
          {!user && (
            <p className="text-muted mt-3">Please <a href="/login">login</a> to leave a comment.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GalleryPage;
