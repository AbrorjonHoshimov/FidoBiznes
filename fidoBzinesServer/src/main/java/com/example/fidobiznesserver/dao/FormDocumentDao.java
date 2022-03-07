package com.example.fidobiznesserver.dao;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.FormDoc;
import com.example.fidobiznesserver.Payload.FormDocInfo;

import java.util.List;
import java.util.Optional;

public interface FormDocumentDao<T> {
    List<FormDocInfo> list();

    ApiResponse create(T t);

    FormDoc get(int id);

    ApiResponse update(T t, int id);

    ApiResponse delete(int id);

}
