package com.example.fidobiznesserver.dao;

import java.util.List;

public interface DocumentSenderDao<T> {
    List<T> list();
}
