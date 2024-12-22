import React from 'react';

const FormInputGroup = ({
  label, type, name, value, onChange, options, placeholder,
  required = false, min, rows, uploading, uploadMessage
}) => {
  const renderInputField = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name} value={value} onChange={onChange} required={required}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>{placeholder}</option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={name} value={value} onChange={onChange} required={required} rows={rows}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={placeholder}
          />
        );
      case 'file':
        return (
          <>
            <input
              type="file" name={name} onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {uploading && <p className="text-sm text-gray-500 mt-2">{uploadMessage}</p>}
          </>
        );
      default:
        return (
          <input
            type={type} name={name} value={value} onChange={onChange} required={required} min={min}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
      {renderInputField()}
    </div>
  );
};

export default FormInputGroup;
