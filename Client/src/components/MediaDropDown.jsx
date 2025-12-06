import { useState, forwardRef, useImperativeHandle } from "react";
import "./MediaDropDownStyle.css"

const MediaDropdown = forwardRef(function MediaDropdown(
  { options = [], onSelect },
  ref
) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select");

  // Expose value + setter to parent (if needed)
  useImperativeHandle(ref, () => ({
    value: selected,
    setValue: setSelected,
  }));

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    onSelect?.(opt); // notify parent instantly
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {selected}
        <span className={`arrow ${open ? "rotate" : ""}`}>⌄</span>
      </div>

      {open && (
        <ul className="dropdown-list">
          {options.map((opt) => (
            <li
              key={opt}
              className="dropdown-item"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default MediaDropdown;
