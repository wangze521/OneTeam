package com.jk.repository;

import com.jk.model.KeshiModel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
public interface MovieRepository extends ElasticsearchRepository<KeshiModel,Integer> {

}
