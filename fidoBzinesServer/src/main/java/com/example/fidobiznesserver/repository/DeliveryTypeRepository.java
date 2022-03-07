package com.example.fidobiznesserver.repository;

import com.example.fidobiznesserver.Payload.Attachment;
import com.example.fidobiznesserver.Payload.DeliveryType;
import com.example.fidobiznesserver.Payload.FormDoc;
import com.example.fidobiznesserver.Payload.FormDocInfo;
import com.example.fidobiznesserver.dao.DeliveryTypeDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeliveryTypeRepository implements DeliveryTypeDao<DeliveryType> {
    private static final Logger log = LoggerFactory.getLogger(DeliveryTypeRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;




    RowMapper<DeliveryType> rowMapper = (rs, rowNum) -> {
        DeliveryType deliveryType =new DeliveryType();
        deliveryType.setId(rs.getInt("id"));
        deliveryType.setName(rs.getString("name"));
        return deliveryType;
    };
    @Override
    public List<DeliveryType> list() {
        String sql = "select * from delivery_type";
        return jdbcTemplate.query(sql,rowMapper);
    }


}
