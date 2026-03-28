// import React from "react";
import styled from "styled-components";

const primary = "#4D148C";

/* ================= STYLES ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
`;

const Box = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 15px;
`;

const SectionTitle = styled.h4`
  margin-bottom: 10px;
  color: ${primary};
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const Btn = styled.button`
  background: ${primary};
  color: white;
  padding: 12px;
  border: none;
  width: 100%;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelBtn = styled(Btn)`
  background: #ccc;
  color: black;
`;

export default function ShipmentModal({
  form,
  setForm,
  onClose,
  onSave,
  editing,
}) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Overlay>
      <Box>
        <form onSubmit={handleSubmit}>
          <h3>{editing ? "Edit Shipment" : "Add Shipment"}</h3>

          {/* 🧾 Shipment Info */}
          <Section>
            <SectionTitle>Shipment Info</SectionTitle>
            <Label>Shipment Date *</Label>
            <Input
              type="date"
              name="shipmentDate"
              value={form.shipmentDate || ""}
              onChange={handleChange}
              required
            />

            <Label>Delivery Type *</Label>
            <Select
              name="deliveryType"
              value={form.deliveryType || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </Select>
          </Section>

          {/* 👤 Sender */}
          <Section>
            <SectionTitle>Sender (Shipper)</SectionTitle>
            <Label>Name *</Label>
            <Input
              name="senderName"
              value={form.senderName || ""}
              onChange={handleChange}
              required
            />

            <Label>Email *</Label>
            <Input
              type="email"
              name="senderEmail"
              value={form.senderEmail || ""}
              onChange={handleChange}
              required
            />

            <Label>Phone Number *</Label>
            <Input
              name="senderPhone"
              value={form.senderPhone || ""}
              onChange={handleChange}
              required
            />

            <Label>Address *</Label>
            <Input
              name="senderAddress"
              value={form.senderAddress || ""}
              onChange={handleChange}
              required
            />
          </Section>

          {/* 📍 Receiver */}
          <Section>
            <SectionTitle>Receiver (Consignee)</SectionTitle>
            <Label>Name *</Label>
            <Input
              name="receiverName"
              value={form.receiverName || ""}
              onChange={handleChange}
              required
            />

            <Label>Email *</Label>
            <Input
              type="email"
              name="receiverEmail"
              value={form.receiverEmail || ""}
              onChange={handleChange}
              required
            />

            <Label>Phone Number *</Label>
            <Input
              name="receiverPhone"
              value={form.receiverPhone || ""}
              onChange={handleChange}
              required
            />

            <Label>Address *</Label>
            <Input
              name="receiverAddress"
              value={form.receiverAddress || ""}
              onChange={handleChange}
              required
            />
          </Section>

          {/* 📦 Package */}
          <Section>
            <SectionTitle>Package Details</SectionTitle>
            <Label>Description *</Label>
            <Input
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              required
            />

            <Label>Quantity *</Label>
            <Input
              type="number"
              name="quantity"
              value={form.quantity || ""}
              onChange={handleChange}
              required
            />

            <Label>Weight (kg) *</Label>
            <Input
              name="weight"
              value={form.weight || ""}
              onChange={handleChange}
              required
            />

            <Label>Package Type</Label>
            <Input
              name="packageType"
              value={form.packageType || ""}
              onChange={handleChange}
            />
          </Section>

          {/* 💰 Payment */}
          <Section>
            <SectionTitle>Payment</SectionTitle>
            <Label>Declared Value *</Label>
            <Input
              name="value"
              value={form.value || ""}
              onChange={handleChange}
              required
            />

            <Label>Payment Method *</Label>
            <Select
              name="paymentMethod"
              value={form.paymentMethod || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Prepaid">Prepaid</option>
              <option value="Pay on Delivery">Pay on Delivery</option>
            </Select>
          </Section>

          {/* 🚚 Delivery */}
          <Section>
            <SectionTitle>Delivery</SectionTitle>
            <Label>Delivery Instructions</Label>
            <Input
              name="instructions"
              value={form.instructions || ""}
              onChange={handleChange}
            />

            <Label>Status *</Label>
            <Select
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              required
            >
                <option>--select status--</option>
              <option>Pending</option>
              <option>Confirmed</option>
           <option>On Transit</option>
              <option>Awaiting Custom Clearance</option>
          
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </Select>
          </Section>

          <Btn type="submit">
            {editing ? "Update Shipment" : "Create Shipment"}
          </Btn>
          <CancelBtn type="button" onClick={onClose}>
            Cancel
          </CancelBtn>
        </form>
      </Box>
    </Overlay>
  );
}