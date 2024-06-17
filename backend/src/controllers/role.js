import Role from "../models/role.js";
import {createRoleSchema, updateRoleSchema} from "../Schema/role.js";

// Tạo một vai trò mới
export const createRole = async (req, res) => {
  try {
    const { role_name, description, trang_thai } = req.body;

    const validation = createRoleSchema.validate({
      role_name
    });

    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message });
    }

    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      return res.status(400).json({ error: "Role đã tồn tại" });
    }

    const role = new Role({ role_name, description, trang_thai });
    const newRole = await role.save();
    res.status(200).json(newRole);
  } catch (error) {
    res.status(500).json({ error: "Could not create role" });
  }
};

// Lấy danh sách các vai trò
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve roles" });
  }
};

// Lấy thông tin một vai trò cụ thể dựa trên role_id
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ role_name: role.role_name, description: role.description });
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve role" });
  }
};

// Cập nhật thông tin một vai trò cụ thể dựa trên role_id
export const updateRole = async (req, res) => {
  try {
    const { role_name, description } = req.body;

    const validation = updateRoleSchema.validate({
      role_name,
      description,
      // trang_thai,
    });

    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message });
    }

    const role = await Role.findOne({ _id: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.role_name = role_name;
    role.description = description;
    // role.trang_thai = trang_thai;

    const updatedRole = await role.save();
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: "Could not update role" });
  }
};

// Xóa một vai trò cụ thể dựa trên role_id
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndRemove({ _id: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: "Xóa role không thành công" });
    }
    return res.status(200).json({ message: "Role deleted successfully", role, });
  } catch (error) {
    res.status(500).json({ error: "Could not delete role" });
  }
};


export const findRoleByName = async (req, res) => {
  try {
    const role = await Role.findOne({ role_name: req.params.roleName });
    if (role) {
      res.status(200).json({ role });
    } else {
      res.status(404).json({ error: 'Không tìm thấy vai trò' });
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm vai trò:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
};