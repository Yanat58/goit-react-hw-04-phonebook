import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filterLabel}>
      <b className={css.filterText}>Find contacts by name</b>

      <input
        className={css.filterInput}
        type="text"
        value={value}
        placeholder="search"
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
