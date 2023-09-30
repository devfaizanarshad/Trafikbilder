/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TagsInput } from 'react-tag-input-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTags, cilMovie, cilList } from '@coreui/icons';

function AddVideo() {
    const [name, setName] = useState("");
    const [tags, setTags] = useState(['Inbound']);
    const [selectedCategories, setSelectedCategories] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/allCategoriesNames`)
            .then((result) => {
                if (Array.isArray(result.data.data)) {
                    setCategories(result.data.data);
                } else {
                    console.error("API response is not an array:", result.data.data);
                }
            })
            .catch((error) => {
                console.error("API error:", error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedVideo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a video file to upload.',
            });
            return;
        }

        // Create a video element to get the duration
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.src = URL.createObjectURL(selectedVideo);

        // Wait for video metadata to load
        videoElement.addEventListener('loadedmetadata', async () => {
            // Check video duration (less than 15 seconds)
            console.log("videoElement.duration: " + videoElement.duration);
            if (videoElement.duration > 17) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Video duration must upto 15 seconds.',
                });
                return;
            }

            const formData = new FormData();
            formData.append('state', 'Approved');
            formData.append('tags', tags);
            formData.append('categories', selectedCategories);
            // formData.append('name', resizedVideo, selectedFile.name);
            formData.append('name', selectedVideo, selectedVideo.name);
            // formData.append('video', selectedVideo);


            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/video/addVideo`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.data.message,
                    });

                    navigate('/video/list');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.message,
                    });

                    if (
                        response.data.status === 400 &&
                        response.data.message === 'This video already exists'
                    ) {
                        navigate('/video/list');
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response ? error.response.data.message : 'An error occurred',
                });

                if (
                    error.response.status === 400 &&
                    error.response.data.message === 'This video already exists'
                ) {
                    navigate('/video/list');
                }
            }
        });

        // Handle any errors that may occur during video metadata loading
        videoElement.addEventListener('error', () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while fetching video duration.',
            });
        });

        // Start loading video metadata
        videoElement.load();
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     e.preventDefault();

    //     if (!selectedVideo) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: 'Please select a video file to upload.',
    //         });
    //         return;
    //     }

    //     console.log("selectedVideo.duration: " + selectedVideo.duration);

    //     // Check video duration (less than 20 seconds)
    //     if (selectedVideo.duration > 5) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: 'Video duration must be less than 20 seconds.',
    //         });
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('state', 'Approved');
    //     formData.append('tags', tags);
    //     formData.append('categories', selectedCategories);
    //     // formData.append('name', resizedVideo, selectedFile.name);
    //     formData.append('name', selectedVideo, selectedVideo.name);
    //     // formData.append('video', selectedVideo);


    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/video/addVideo`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         if (response.data.status === 200) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Success',
    //                 text: response.data.message,
    //             });

    //             navigate('/video/list');
    //         } else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 text: response.data.message,
    //             });

    //             if (
    //                 response.data.status === 400 &&
    //                 response.data.message === 'This video already exists'
    //             ) {
    //                 navigate('/video/list');
    //             }
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: error.response ? error.response.data.message : 'An error occurred',
    //         });

    //         if (
    //             error.response.status === 400 &&
    //             error.response.data.message === 'This video already exists'
    //         ) {
    //             navigate('/video/list');
    //         }
    //     }
    // };

    return (
        <>
            <div className="bg-light my-3 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol xs={12} lg={8} md={10}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={handleSubmit} encType="multipart/form-data">
                                            <h2>Upload New Video</h2>
                                            <p className="text-small-emphasis">Upload your video (max 15 seconds)</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilMovie} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="file"
                                                    id="video"
                                                    name="video"
                                                    accept="video/mp4"
                                                    onChange={(e) => setSelectedVideo(e.target.files[0])}
                                                    required
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilTags} />
                                                </CInputGroupText>
                                                <TagsInput
                                                    name="tags"
                                                    id="tags"
                                                    value={tags}
                                                    onChange={(newTags) => setTags(newTags)}
                                                    placeHolder="Add Tags"
                                                    autoComplete="tags"
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilList} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="text"
                                                    value="Select Categories Below"
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <select
                                                    className="form-select"
                                                    onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value))}
                                                    multiple
                                                    style={{ height: '200px', minHeight: '120px', padding: '5px' }}
                                                    required
                                                >
                                                    <optgroup>
                                                        {categories.map((size, index) => (
                                                            <option key={index} value={size}>
                                                                {size}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                </select>
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={12} sm={6}>
                                                    <CButton
                                                        className="w-100"
                                                        type="submit"
                                                        style={{
                                                            color: '#fff',
                                                            backgroundColor: '#D4AF37',
                                                            border: 'none',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Upload Video
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    );
}

export default AddVideo;