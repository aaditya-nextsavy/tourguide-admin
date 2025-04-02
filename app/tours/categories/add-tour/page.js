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
    tourName: "",
    title: "",
    location: "",
    tourSlug: "",
    days: 1,
    category: "",
    dateOption: "range",
    dateRange: { start: "", end: "" },
    userPreferences: false,
    inquiry: false,
    price: 0,
    description: "",
    activity: "",
    included: [],
    notIncluded: [],
    isActive: false,
    popularTour: false,
  });

  const categories = ["Adventure", "Beach", "Cultural", "Wildlife"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxArray = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const router = useRouter();

  if (loading) {
    return <Loader />;
  }


  const handleSubmit = async () => {
    const tourSlug = formData.tourName.toLowerCase().replace(/\s+/g, "-");
    const updatedFormData = { ...formData, tourSlug,
      categoryName: formData.category,
     };
    console.log("Submitting Data:", updatedFormData); 


    try {
        const response = await fetch("/api/post?type=categories", {
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

  return (
    <div className="main-content">
      <Navbar />
      <div className="container">
        <div className="content-information">
          <div className="content-information">
            <div className="information-utilities">
              <div>
                <p> Tours Details</p>
              </div>
            </div>
            <div className="add-input-wrapper">
              <div className="add-input-box">
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Tour Name:</label>
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
                    <label>Tour Location:</label>
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
                    <label>Title:</label>
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
                    <label>Category:</label>
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
                <div className="input-box-content"></div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Date Options:</label>
                  </div>
                  <div className="input-value">
                    <label>
                      <input
                        type="radio"
                        name="dateOption"
                        value="range"
                        checked={formData.dateOption === "range"}
                        onChange={handleInputChange}
                      />{" "}
                      Date Range
                    </label>
                    {formData.dateOption === "range" && (
                      <div className="flex gap-2">
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
                    <label>
                      <input
                        type="radio"
                        name="dateOption"
                        value="userPreferences"
                        checked={formData.dateOption === "userPreferences"}
                        onChange={handleInputChange}
                      />{" "}
                      User Preferences
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="dateOption"
                        value="inquiry"
                        checked={formData.dateOption === "inquiry"}
                        onChange={handleInputChange}
                      />{" "}
                      Inquiry
                    </label>
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Price:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Description:</label>
                  </div>
                  <div className="input-value">
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) =>
                        setFormData({ ...formData, description: value })
                      }
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Activity:</label>
                  </div>
                  <div className="input-value">
                    <ReactQuill
                      theme="snow"
                      value={formData.activity}
                      onChange={(value) =>
                        setFormData({ ...formData, activity: value })
                      }
                    />
                  </div>
                </div>
                <div className="input-box-content">
                  <div className="input-label">
                    <label>Included:</label>
                  </div>
                  <div className="input-value">
                    {["Meals", "Transport", "Guide"].map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.included.includes(item)}
                          onChange={(e) => handleCheckboxArray(e, "included")}
                        />{" "}
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
                    {["Meals", "Transport", "Guide"].map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          value={item}
                          checked={formData.included.includes(item)}
                          onChange={(e) => handleCheckboxArray(e, "included")}
                        />{" "}
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="input-box-content">
                  <div className="input-label">
                    <label> Is Active:</label>
                  </div>
                  <div className="input-value">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
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
                <div onClick={handleSubmit} className="information-add-btn">
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
