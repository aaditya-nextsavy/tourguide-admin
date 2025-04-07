"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Tours() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    tourSlug: "slug",
    tourName: "",
    title: "",
    location: "",
    city: "",
    category: "",
    price: "0",
    familyPlan: true,
    dateOption: "range",
    dateRange: {
      start: "",
      end: "",
    },
    duration: "",
    days: 1,
    stars: "1",
    reviews: 0,
    transport: false,
    familyPlan: false,
    popularTour: false,
    isActive: false,
    inquiry: false,
    userPreferences: false,
    image:"",
    gallery: [
      "/assets/media/details/london1/london1.png",
      "/assets/media/details/london1/london2.png",
      "/assets/media/details/london1/london3.png",
      "/assets/media/details/london1/london4.png",
      "/assets/media/details/london1/london5.png",
      "/assets/media/details/london1/london6.png",
    ],
    booking_data: {
      from_date: "",
      to_date: "",
      no_of_guests: 1,
      price_per_person: "",
    },
    tour_info: {
      description: {
        title: "Description",
        info: "",
      },
      activity: {
        title: "Activity",
        subhead: "What you will do",
        list: [],
      },
      inclusion: {
        title: "Included/Not Included",
        included: {
          subhead: "Included",
          list: [],
        },
        not_included: {
          subhead: "Not Included",
          list: [],
        },
      },
      box_summary: {
        box_items: [
          {
            heading: "",
            desc: "",
          },
        ],
      },
      safety: {
        title: "Safety Measures",
        subhead: "Health Precautions",
        list: [],
      },
      details: {
        title: "Details",
        columns: [
          {
            subhead: "",
            list: [],
          },
        ],
      },
      meeting_point: {
        subhead: "Meeting Point Address",
        address: "",
        link: "",
        google_maps: "",
      },
    },
    related_tours_today: [],
    related_tours_city: [],
    customer_review: {
      score: "",
      reviews_count: 0,
      stars: 0,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const categories = ["Adventure", "Beach", "Cultural", "Wildlife"];
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onImageUpload = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleFile = (file) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/svg+xml",
      "image/pjpeg",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Unsupported file type.");
      return;
    }

    if (file.size > maxSize) {
      setError("File size exceeds 5MB.");
      return;
    }

    setError("");
    onImageUpload(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleCheckboxArray = (e, type) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const oldList = prev.tour_info?.inclusion?.[type]?.list || [];
      const updatedList = checked
        ? [...oldList, value]
        : oldList.filter((item) => item !== value);

      return {
        ...prev,
        tour_info: {
          ...prev.tour_info,
          inclusion: {
            ...prev.tour_info?.inclusion,
            [type]: {
              ...prev.tour_info?.inclusion?.[type],
              list: updatedList,
            },
          },
        },
      };
    });
  };

  const validateForm = () => {
    const { tourName, title, location, days, category, dateRange, dateOption } =
      formData;

    if (!tourName || !title || !location || !category) {
      // setIsFormValid(false);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateOption === "range") {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      if (!dateRange.start || !dateRange.end) {
        setIsFormValid(false);
        return;
      }

      if (startDate < today) {
        setIsFormValid(false);
        return;
      }

      if (endDate < startDate) {
        setIsFormValid(false);
        return;
      }

      const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      if (differenceInDays < days - 1) {
        setIsFormValid(false);
        return;
      }
    }

    setIsFormValid(true);
  };

  useEffect(() => {
    validateForm();

    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const tourSlug = formData.tourName.toLowerCase().replace(/\s+/g, "-");
    const updatedFormData = { ...formData, tourSlug };

    console.log(formData);
  }, [formData.tourName]);

  const router = useRouter();

  if (loading) {
    // return <Loader />;
  }

  const handleSubmit = async () => {
    if (!isFormValid) return;

    const tourSlug = formData.tourName.toLowerCase().replace(/\s+/g, "-");
    const updatedFormData = { ...formData, tourSlug };
    console.log("Submitting Data:", updatedFormData);

    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setError("");

    const fileInput = document.getElementById("uploadInput");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="main-content">
      <Navbar title="Add Tour" backFlag={true} />

      <div className="container">
        <div className="content-information">
          <div className="content-information">
            <div className="information-utilities">
              <div>
                <p> Location Details</p>
              </div>
            </div>
            <div className="add-input-wrapper">
              <div className="add-input-box">
                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Tour Name:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="tourName"
                      placeholder="Tour Name"
                      value={formData.tourName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Tour Location:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="location"
                      placeholder="Tour location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Tour City:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="city"
                      placeholder="Tour City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Title:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="title"
                      placeholder="Tour Title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label> Hours:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="duration"
                      min="1"
                      value={formData.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq"> Cover Image:</label>
                  </div>
                  <div className="input-value">
                  <input
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label>Days:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="days"
                      min="1"
                      value={formData.days}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Category:</label>
                  </div>
                  <div className="input-value">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label>Date Options:</label>
                  </div>
                  <div className="input-value input-value-dates ">
                    <label className="checkbox-line">
                      <p>Date Range</p>

                      <input
                        type="radio"
                        name="dateOption"
                        value="range"
                        checked={formData.dateOption === "range"}
                        onChange={handleInputChange}
                      />
                    </label>
                    {formData.dateOption === "range" && (
                      <div className="date-options">
                        From
                        <input
                          type="date"
                          name="dateStart"
                          value={formData.dateRange.start}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateRange: {
                                ...formData.dateRange,
                                start: e.target.value,
                              },
                            })
                          }
                        />
                        To
                        <input
                          type="date"
                          name="dateEnd"
                          value={formData.dateRange.end}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateRange: {
                                ...formData.dateRange,
                                end: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    )}
                    <label className="checkbox-line">
                      <p> User Preferences</p>
                      <input
                        type="radio"
                        name="dateOption"
                        value="userPreferences"
                        checked={formData.dateOption === "userPreferences"}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="checkbox-line">
                      <p> Inquiry</p>
                      <input
                        type="radio"
                        name="dateOption"
                        value="inquiry"
                        checked={formData.dateOption === "inquiry"}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Price(USD):</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Price"
                      value={formData.booking_data.price_per_person}
                      // onChange={handleInputChange}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          booking_data: {
                            ...formData.booking_data,
                            price_per_person: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Reviews:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="reviews"
                      min="0"
                      placeholder="number of reviews"
                      value={formData.reviews}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Stars:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="stars"
                      min="1"
                      max="5"
                      value={formData.stars}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label>Description:</label>
                  </div>
                  <div className="input-value ">
                    <ReactQuill
                      className="rich-tb"
                      theme="snow"
                      value={formData.tour_info.description.info}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          tour_info: {
                            ...formData.tour_info,
                            description: {
                              ...formData.tour_info.description,
                              info: value,
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Activity:</label>
                  </div>
                  <div className="input-value">
                    <ReactQuill
                      className="rich-tb"
                      theme="snow"
                      value={formData.tour_info.activity.list.join(", ")}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          tour_info: {
                            ...formData.tour_info,
                            activity: {
                              ...formData.tour_info.activity,
                              list: value.split(",").map((item) => item.trim()),
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                {/* safety */}
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Safety:</label>
                  </div>
                  <div className="input-value">
                    <ReactQuill
                      className="rich-tb"
                      theme="snow"
                      value={formData.tour_info.safety.list.join(", ")}
                      onChange={(value) => {
                        setFormData({
                          ...formData,
                          tour_info: {
                            ...formData.tour_info,
                            safety: {
                              ...formData.tour_info.safety,
                              list: value.split(",").map((item) => item.trim()),
                            },
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label className="reqq">Google Maps:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="googlemaps"
                      placeholder="Google map link"
                      value={formData.link}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Map View:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="text"
                      name="mapview"
                      placeholder="Map view"
                      value={formData.tour_info.meeting_point.google_maps}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label>Included:</label>
                  </div>
                  <div className="input-value">
                    {["Meals", "Transport", "Guide"].map((item) => (
                      <label className="checkbox-line" key={item}>
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData?.tour_info?.inclusion?.included?.list?.includes(
                            item
                          )}
                          onChange={(e) => handleCheckboxArray(e, "included")}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Not Included:</label>
                  </div>
                  <div className="input-value">
                    {["flights", "Hotels", "Entery Tickets", "Guide"].map(
                      (item) => (
                        <label key={item} className="checkbox-line">
                          <input
                            type="checkbox"
                            value={item}
                            onChange={(e) =>
                              handleCheckboxArray(e, "not_included")
                            }
                            checked={formData?.tour_info?.inclusion?.not_included?.list?.includes(
                              item
                            )}
                          />
                          {item}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label> Is Active:</label>
                  </div>
                  <div className="input-value">
                    <input
                      className="active-checkbox"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label> Family Plan:</label>
                  </div>
                  <div className="input-value">
                    <input
                      className="active-checkbox"
                      type="checkbox"
                      name="familyPlan"
                      checked={formData.familyPlan}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label> Add to popularTour:</label>
                  </div>
                  <div className="input-value">
                    <input
                      className="active-checkbox"
                      type="checkbox"
                      name="popularTour"
                      checked={formData.popularTour}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="add-btn-wrapper">
                <div
                  onClick={handleSubmit}
                  className={`information-add-btn ${
                    !isFormValid ? "disabled" : ""
                  }`}
                  style={{
                    pointerEvents: isFormValid ? "auto" : "none",
                    opacity: isFormValid ? 1 : 0.5,
                  }}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
