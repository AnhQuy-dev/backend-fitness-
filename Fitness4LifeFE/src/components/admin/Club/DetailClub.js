import { Drawer, Descriptions, Typography, Image, Button, Checkbox, notification } from "antd";
import { useState } from "react";
import "../../../assets/css/Admin/imageClub.css";
import { AddMoreImageClub, UpdateImageClub } from "../../../serviceToken/ClubService";
import { getTokenData } from "../../../serviceToken/tokenUtils";

const { Title, Text } = Typography;

const ViewClubDetail = (props) => {
  const { dataDetail, setDataDetail, isDataDetailOpen, setIsDataDetailOpen } = props;
  const tokenData = getTokenData();//tokenData.access_token

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isAddingImage, setIsAddingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleSelectImage = (imageId) => {
    setSelectedImage((prev) => (prev === imageId ? null : imageId));
  };



  const handleUploadImage = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: URL.createObjectURL(file), // Dùng URL tạm thời để preview
        file,
        clubId: dataDetail.id, // Gán ID của club vào ảnh
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const handleRemoveImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmitAddImages = async () => {
    const formData = new FormData();
    formData.append("clubId", dataDetail.id); // Gán đúng ID club đã chọn

    uploadedImages.forEach((image) => {
      formData.append("file", image.file);
    });

    const reponse = await AddMoreImageClub(formData, tokenData.access_token)
    if (reponse != null) {
      notification.success({
        message: "add imageClub",
        description: "imageClub add successfully."
      });
    } else {
      notification.error({
        message: "Error Creating Club",
        description: JSON.stringify(reponse.message)
      });
    }

    setUploadedImages([]);
    setIsAddingImage(false);
  };

  const handleSubmitUpdateImages = async () => {
    if (!selectedImage) {
      notification.warning({
        message: "No Image Selected",
        description: "Please select an image to update.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("clubId", dataDetail.id); // Gán đúng ID club đã chọn
    uploadedImages.forEach((image) => { formData.append("file", image.file); });
    // console.log("🚀 Club ID:", dataDetail.id);
    // console.log("📸 Uploaded Images:", uploadedImages.map(img => img.file.name));
    // console.log("selectedImage in handleSubmitUpdateImages: ", selectedImage);

    const reponse = await UpdateImageClub(selectedImage, formData, tokenData.access_token)
    if (reponse != null) {
      notification.success({
        message: "update imageClub",
        description: "imageClub update successfully."
      });
    } else {
      notification.error({
        message: "Error updating Club",
        description: JSON.stringify(reponse.message)
      });
    }

    setUploadedImages([]);
    setIsAddingImage(false);
    setIsUpdating(false);
  };
  return (
    <Drawer
      title={<Title level={4}>Club Detail</Title>}
      onClose={() => {
        setDataDetail(null);
        setIsDataDetailOpen(false);
        setIsUpdating(false); // Reset trạng thái cập nhật ảnh
        setIsAddingImage(false); // Reset trạng thái thêm ảnh
      }}
      open={isDataDetailOpen}
      width={1200}
      footer={
        <Text type="secondary">
          Thank you for using our service. For more details, please contact support.
        </Text>
      }
    >
      {dataDetail ? (
        <>
          <Descriptions
            bordered
            column={1}
            size="small"
            labelStyle={{ fontWeight: "bold", width: "30%" }}
            contentStyle={{ background: "#fafafa" }}
          >
            <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{dataDetail.name}</Descriptions.Item>
            <Descriptions.Item label="Address">{dataDetail.address}</Descriptions.Item>
            <Descriptions.Item label="Contact Phone">{dataDetail.contactPhone}</Descriptions.Item>
            <Descriptions.Item label="Description">{dataDetail.description}</Descriptions.Item>
            <Descriptions.Item label="Open Time">{dataDetail.openHour}</Descriptions.Item>
            <Descriptions.Item label="Close Time">{dataDetail.closeHour}</Descriptions.Item>
            <Descriptions.Item label="Rooms">
              {dataDetail.rooms && dataDetail.rooms.length > 0 ? (
                dataDetail.rooms.map((room, index) => (
                  <div key={index}>
                    <Text>{room.roomName}</Text>
                  </div>
                ))
              ) : (
                <Text type="secondary">No rooms available</Text>
              )}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: "20px", textAlign: "center" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <Title level={5} style={{ margin: 0 }}>Club Images</Title>
              <div>
                <Button type="primary" onClick={() => setIsAddingImage(!isAddingImage)}>
                  {isAddingImage ? "Cancel" : "Add Image"}
                </Button>
                <Button
                  type="default"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setIsUpdating(!isUpdating);
                    setIsAddingImage(true);
                  }}
                >
                  {isUpdating ? "Cancel Update" : "Update Image"}
                </Button>
              </div>
            </div>
            {dataDetail.clubImages && dataDetail.clubImages.length > 0 ? (
              <div className="club-images-container">
                {dataDetail.clubImages.map((image, index) => (
                  <div key={index} className="club-image-wrapper" onClick={() => handleSelectImage(image.id)}>
                    {isUpdating && (
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedImage === image.id}
                          onChange={() => handleSelectImage(image.id)}
                        />
                        <span></span>
                      </label>
                    )}
                    <Image
                      src={image.imageUrl}
                      alt={`Club Image ${index + 1}`}
                      className="club-image"
                      placeholder
                      preview={!isUpdating}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No images available</Text>
            )}
            {isAddingImage && (
              <div className="upload-container">
                <Title level={5}>Upload New Images</Title>
                <input type="file" multiple onChange={handleUploadImage} />
                <div className="preview-images">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="preview-item">
                      <img src={image.id} alt="preview" className="preview-img" />
                      <button onClick={() => handleRemoveImage(image.id)}>❌</button>
                    </div>
                  ))}
                </div>
                {isUpdating ? (
                  <Button type="primary" onClick={handleSubmitUpdateImages}>Update Now</Button>
                ) : (
                  <Button type="primary" onClick={handleSubmitAddImages}>Add</Button>
                )}
              </div>
            )}


          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", color: "red" }}>
          <h3>Don't have anything here!</h3>
        </div>
      )}
    </Drawer>
  );
};

export default ViewClubDetail;
