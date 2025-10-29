import { FiUser } from "react-icons/fi";
import Input from "../../components/common/Input";

const CommonFields = ({ form, handleChange, loading }) => (
  <section className="space-y-6">
    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <FiUser className="text-yellow-600" /> Basic Information
    </h4>
    <div className="grid md:grid-cols-2 gap-6">
      <Input
        name="fullName"
        label="Full Name"
        required
        value={form.fullName}
        onChange={handleChange}
        loading={loading}
      />
      <Input
        name="phone"
        label="Phone Number"
        required
        value={form.phone}
        onChange={handleChange}
        loading={loading}
      />
    </div>
    <Input
      name="address"
      label="Address"
      required
      value={form.address}
      onChange={handleChange}
      loading={loading}
    />
  </section>
);

export default CommonFields;
