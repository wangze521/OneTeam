package com.jk.controller;

import com.jk.repository.MovieRepository;
import com.jk.model.KeshiModel;
import com.jk.service.KeshiService;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("keshi")
public class KeshiController {

    @Autowired
    private KeshiService service;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Autowired
    private MovieRepository movieRepository;


    @RequestMapping("query")
    @ResponseBody
    public List query(){

        List<KeshiModel> list = service.query();
        KeshiModel model = new KeshiModel();
        for (int i=0;i<list.size();i++){

            model.setId(list.get(i).getId());
            model.setName(list.get(i).getName());
            model.setPid(list.get(i).getPid());
            movieRepository.save(model);

        }




        return list;
    }

    @RequestMapping("find")
    @ResponseBody
    public Map<String,Object> find(Integer page, Integer rows, KeshiModel k) {
        //可以对 名称  介绍 类型 模糊匹配  并且 高亮
        //对名称  介绍 类型  价格区间进行过滤
        //对价格进行排序  desc
        //分页


        //处理参数
        if (page == null)
            page = 1;
        if (rows == null)
            rows = 3;


        //创建 返回体
        HashMap<String, Object> result = new HashMap<>();

        //获取 查询组件
        BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
        //汽车名称
        if (k.getName() != null && !"".equals(k.getName())){
            boolQueryBuilder.must(QueryBuilders.matchQuery("name",k.getName()));
        }


        //获取高亮的组件
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("name");
        highlightBuilder.preTags("<span style='color:red;'>");
        highlightBuilder.postTags("</span>");

        //通过模板  获取搜索请求组件
        SearchRequestBuilder carindex1 = elasticsearchTemplate.getClient().prepareSearch("hospital")
                .highlighter(highlightBuilder)  // 设置高亮策略
                .setQuery(boolQueryBuilder) //设置查询策略
                .setTypes("hospital")    //设置 索引中的类名

                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH) //设置查询的类型  有四种
                .setFrom((page - 1)*rows) //设置分页其实位置
                .setSize(rows);//设置每页条数

        //获取响应体
        SearchResponse searchResponse = carindex1.get();

        SearchHits hits = searchResponse.getHits();

        //获取总条数
        int totalHits = (int) hits.totalHits;

        //获取数据存放的组件
        SearchHit[] hitsHits = hits.getHits();

        ArrayList<KeshiModel> carList = new ArrayList<>();

        for (SearchHit searchHit : hitsHits){
            //创建一个实体
            KeshiModel ke = new KeshiModel();

            Map<String, HighlightField> highlightFields = searchHit.getHighlightFields();

            HighlightField name = highlightFields.get("name");



            //处理高亮字段
            if (name == null)//如果高亮字段是空  那么 就用查找出的 普通的 字段
                ke.setName(searchHit.getSourceAsMap().get("name").toString());
            else //如果 不是空那么 就用 高亮字段  替换掉  普通的字段
                ke.setName(name.fragments()[0].toString());

            carList.add(ke);
        }

        result.put("total",totalHits);
        result.put("rows",carList);
        return result;
    }


}
