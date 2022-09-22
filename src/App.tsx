import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home, Store, About, Error, SharedLayout } from "./pages";
import { AppContext } from "./context/ShoppingCartContext";

function App() {
  return (
    <AppContext>
      <Container>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Container>
    </AppContext>
  );
}

export default App;
