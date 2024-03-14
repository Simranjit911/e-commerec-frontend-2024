// function Button({
//   text,
//   icon,
//   fn,
//   preDefined = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-sm text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-2 py-1",
//   classes,
// }) {
//   return (
//     <button
//       onClick={()=>fn()}
//       className={`${preDefined} ${classes} ${
//         icon ? "flex items-center justify-center" : ""
//       }`}
//     >
//       {text} {icon && icon}
//     </button>
//   );
// }

// export default Button;
function Button({
  text,
  icon,
  fn,
  preDefined = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-sm text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 px-2 py-1",
  classes,
}) {
  return (
    <button
      onClick={fn ? () => fn() : undefined} // Conditionally apply onClick event
      className={`${preDefined} ${classes} ${
        icon ? "flex items-center justify-center" : ""
      }`}
    >
      {text} {icon && icon}
    </button>
  );
}

export default Button;
